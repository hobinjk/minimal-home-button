/* jshint browser: true, devel: true */

(function() {
  function debug(message) {
    console.log('AlwaysFullscreen: ' + message);
  }

function handleEvent(e) {
  var softwareHomeButton = document.getElementById('software-home-button');

  switch (e.type) {
    case 'keyboardhide':
      softwareHomeButton.style.visibility = 'visible';
      break;
    // Apparently secretly keyboardshow equivalent
    case 'keyboardchange':
      softwareHomeButton.style.visibility = 'hidden';
      break;
  }
}

  function init() {
    window.addEventListener('keyboardhide', handleEvent);
    window.addEventListener('keyboardchange', handleEvent);

    console.log('AlwaysFullscreen: Styling');
    var style = document.createElement('style');
    style.textContent = [
':root {',
'  --software-home-button-height: 0rem;',
'}',
'#software-buttons-dead-space {',
'  display: none;',
'  pointer-events: none;',
'}',
'',
'#software-home-ring {',
'  outline-color: #FF4E00;',
'}',
'',
'#software-home-button {',
'  position: absolute;',
'',
'  top: auto;',
'  right: auto;',
'  bottom: 0.5rem;',
'  left: calc(50% - var(--button-width) / 2);',
'}',
'',
'@media (orientation: landscape) {',
'  #software-home-button {',
'    top: auto;',
'    left: auto;',
'    right: 0.5rem;',
'    bottom: calc(50% - var(--button-width) / 2);',
'  }',
'}'
    ].join('\n');
    document.body.appendChild(style);
  }

  if (document.getElementById('software-buttons')) {
    debug('Window was ready');
    init();
  } else {
    debug('Waiting for window');
    window.addEventListener('mozContentEvent', function readyListener(e) {
      if (e.detail.type === 'system-message-listener-ready') {
        window.removeEventListener('mozContentEvent', readyListener);
        init();
      }
    });
  }
})();
