try{const value=localStorage.getItem('mh-theme-v3');document.documentElement.dataset.theme=value==='dark'?'dark':'light'}catch{}

try{const c=navigator.connection;if(c?.saveData||/^(slow-)?2g$/.test(c?.effectiveType||'')||(navigator.deviceMemory&&navigator.deviceMemory<=4)||(navigator.hardwareConcurrency&&navigator.hardwareConcurrency<=2))document.documentElement.dataset.effects='lite'}catch{}
