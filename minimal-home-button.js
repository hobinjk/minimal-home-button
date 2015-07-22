/* jshint browser: true, devel: true */

(function() {

var style = document.createElement('style');
style.textContent = [
':root {',
'  --software-home-button-height: 0rem;',
'}',
'',
'#software-home-ring {',
'  outline-color: #FF4E00;',
'}',
'',
'#software-home-button {',
'  position: absolute;',
'  top: auto;',
'  right: auto;',
'  bottom: 0.5rem;',
'  left: calc(50vw - var(--button-width) / 2);',
'}',
'',
'@media (orientation: landscape) {',
'  #software-home-button {',
'    --button-width: 7rem;',
'    --button-height: 5rem;',
'    width: 7rem;',
'    height: 5rem;',
'    top: auto;',
'    left: auto;',
'    right: calc(50vw - var(--button-width) / 2);',
'    bottom: 0.5rem;',
'  }',
'}'
].join('\n');

function handleEvent(e) {
  var softwareHomeButton = document.getElementById('software-home-button');

  switch (e.type) {
    case 'keyboardhide':
      softwareHomeButton.style.visibility = null;
      break;
    // Apparently secretly keyboardshow equivalent
    case 'keyboardchange':
      softwareHomeButton.style.visibility = 'hidden';
      break;
  }
}

function setup() {
  window.addEventListener('keyboardhide', handleEvent);
  window.addEventListener('keyboardchange', handleEvent);
  document.body.appendChild(style);
}

function teardown() {
  window.removeEventListener('keyboardhide', handleEvent);
  window.removeEventListener('keyboardchange', handleEvent);
  document.body.removeChild(style);
}

if (document.getElementById('software-buttons')) {
  setup();
} else {
  window.addEventListener('mozContentEvent', function readyListener(e) {
    if (e.detail.type === 'system-message-listener-ready') {
      window.removeEventListener('mozContentEvent', readyListener);
      setup();
    }
  });
}

// Inspired by marumari's Sunset addon
navigator.mozApps.mgmt.onuninstall = function() {
  teardown();
};
navigator.mozApps.mgmt.onenabledstatechange = function(event) {
  var app = event.application;
  if (app.manifest.name === 'Minimal Home Button') {
    if (app.enabled) {
      setup();
    } else {
      teardown();
    }
  }
};

})();
