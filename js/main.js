//CODE FOR COLOR OPTION BUTTON
function changeImage(color) {
  const img = document.getElementById('landImage');
  
  if (color === 'blue') {
    img.src = 'images/color1.png'; 

  } else if (color === 'black') {
    img.src = 'images/color3.png'; 

  } else if (color === 'red') {
    img.src = 'images/color2.png';  
  }

  else if (color === 'white') {
  img.src = 'images/image1.png';  
}
  
}




//CODE FOR SCROLL ANIMATION
(() => {
  const canvas = document.querySelector("#explode-view");

  context = canvas.getContext("2d");

  canvas.width = 1920;
  canvas.height = 1580;

  const frameCount = 280; // how many frames are there in animation

  const images = []; // array to hold all the images

  const buds = {// create an object called buds to hold current frame
   frame: 0
  }


  //run a for loop to load all the images
  for (let i = 0; i < frameCount; i++) {
   const img = new Image();
   img.src = `rendered_frames/poster-temp-1_${(i + 1).toString().padStart(4, "0")}.png`;
   images.push(img);
  }


  //console.table(images);

  gsap.to(buds, {
   frame: 279,
   snap: "frame",
   scrollTrigger: {
     trigger: "#explode-view",
     pin: true,
     scrub: 1.4,
     markers: false,
     start: "0", 
     end: "370",
   },
onUpdate: render

  })

  images[0].addEventListener("load", render);
function render(){
context.clearRect(0, 0, canvas.width, canvas.height);
console.log(images[buds.frame]);
context .drawImage(images[buds.frame], 0, 0);
}

})();





//CODE FOR GALLERY

(() => {
  let currentImageIndex = 0;

  const images = [
    'images/POSTER-4.jpg',
    'images/POSTER-2.jpg',
    'images/POSTER-3.jpg',
    'images/POSTER-1.jpg',
    'images/POSTER-5.jpg',
    'images/POSTER-6.jpg',
  ];

  function changeGalleryImage(direction) {
    console.log('changeGalleryImage called with direction:', direction);
    currentImageIndex += direction;

    if (currentImageIndex < 0) {
      currentImageIndex = images.length - 1;
    } else if (currentImageIndex >= images.length) {
      currentImageIndex = 0;
    }

    console.log('currentImageIndex:', currentImageIndex);
    document.getElementById('gallery-image').src = images[currentImageIndex];
  }

  window.changeGalleryImage = changeGalleryImage;

  document.addEventListener('keydown', (event) => {
    console.log('keydown event:', event);
    if (event.key === 'ArrowLeft') {
      window.changeGalleryImage(-1);
    } else if (event.key === 'ArrowRight') {
      window.changeGalleryImage(1);
    }
  });
})();



//CODE FOR X-RAY
(() => {

  const divisor = document.querySelector('#divisor');
  const slider = document.querySelector('#slider');
  const xray = document.querySelector('#xray');
  
  
  function moveDivisor() {
    console.log(slider.value);
    divisor.style.width = `${slider.value}%`;
  }
  
  slider.addEventListener('input', moveDivisor);
    
  })();




//CODE FOR SCROLL TRIGGER EFFECT
//   (() => {

//     gsap.registerPlugin(ScrollTrigger);
//     gsap.registerPlugin(ScrollToPlugin);

//     gsap.to("#why-resonate", 2,
//         {
//             scrollTrigger: {
//                 trigger:"#why-resonate", // you can change the trigger class if you want animation to happen on crossing different div
//                 toggleActions: "restart none none none",//onEnter, onLeave, onEnterBack, onLeaveBack.
//                 markers: true, 
//                 start: "top 120%", //animation box starts, scroller start
//                 end: "top 20%", //animation box ends, scroller end
//             },
//             y:-170,
//         }
//     )
  
// })();


//model viewer
(() => {
  console.log("IIFE Fired");

  const hotspotsData = [
    {
      slot: "hotspot-1",
      position: "-2.1962142981302204m -0.66911144629734m -2.468552748802964m",
      normal: "-0.048240324603482876m 0.016303965422151578m -0.9987026843829268m",
      title: "SENSOR",
      description: "Advanced touch sensors provide seamless control, allowing you to play, pause, or switch tracks with a simple tap.",
      image: "images/sensor.jpeg" 
    },
    {
      slot: "hotspot-2",
      position: "0.8346002183375707m 0.9510862129963416m 0.7014103379265029m",
      normal: "0.06515625138429774m 0.8102770561764502m 0.5824137319290921m",
      title: "SILICONE TIP",
      description: "Ergonomically designed silicone tips offer a snug, comfortable fit, enhancing noise isolation and providing a secure seal.",
      image: "images/silicone.jpeg" 
    },
    {
      slot: "hotspot-3",
      position: "-2.2919281130449027m -5.533467224336521m -1.1530709190289732m",
      normal: "-0.35408915451172623m -0.46962817466395007m 0.8087460962619711m",
      title: "CHARGING",
      description: "Quick-charge technology powers up your earbuds swiftly, keeping you connected and ready to go in just 10 minutes.",
      image: "images/charging.jpeg" 
    },
    {
      slot: "hotspot-4",
      position: "-2.263781338793401m 0.3426803703964415m -2.2531012871858778m",
      normal: "-0.07926645521850638m 0.9966508151798127m 0.020099295472906748m",
      title: "MICROPHONE",
      description: "High-quality microphones capture clear and crisp audio, ensuring a seamless and immersive listening experience.",
      image: "images/microphone.jpeg"
    },
  ];

  const hotspots = document.querySelectorAll(".hotspot");

  // Functions
  function showInfo(e) {
    const slot = e.currentTarget.slot;
    const selectedHotspot = hotspotsData.find(hotspot => hotspot.slot === slot);
    if (selectedHotspot) {
      const selected = document.querySelector(`button[slot="${slot}"] > div`);
      selected.innerHTML = `
        <h2>${selectedHotspot.title}</h2>
        <p>${selectedHotspot.description}</p>
        <img src="${selectedHotspot.image}" alt="${selectedHotspot.title}" ;">
      `;
      gsap.to(selected, 1, { autoAlpha: 1 });
    }
  }

  function hideInfo(e) {
    const slot = e.currentTarget.slot;
    const selected = document.querySelector(`button[slot="${slot}"] > div`);
    gsap.to(selected, 1, { autoAlpha: 0 });
  }

  // Event listeners
  hotspots.forEach(hotspot => {
    hotspot.addEventListener("mouseover", showInfo);
    hotspot.addEventListener("mouseout", hideInfo);
  });

})();

// Handles loading the events for <model-viewer>'s slotted progress bar
const onProgress = (event) => {
  const progressBar = event.target.querySelector('.progress-bar');
  const updatingBar = event.target.querySelector('.update-bar');
  updatingBar.style.width = `${event.detail.totalProgress * 100}%`;
  if (event.detail.totalProgress === 1) {
    progressBar.classList.add('hide');
    event.target.removeEventListener('progress', onProgress);
  } else {
    progressBar.classList.remove('hide');
  }
};
document.querySelector('model-viewer').addEventListener('progress', onProgress);


(() => {

  gsap.registerPlugin(ScrollTrigger);


  gsap.to(".box-content", 1.2,
      {
          scrollTrigger: {
              trigger:".box-content", // you can change the trigger class if you want animation to happen on crossing different div
              toggleActions: "restart none none none",//onEnter, onLeave, onEnterBack, onLeaveBack.
              markers: false, 
              start: "-100 50%", //animation box starts, scroller start
              end: "bottom 50%", //animation box ends, scroller end
          },
          opacity:1,
      }
  )
  gsap.to(".features-content", 1.2,
    {
        scrollTrigger: {
            trigger:".features-content", // you can change the trigger class if you want animation to happen on crossing different div
            toggleActions: "restart none none none",//onEnter, onLeave, onEnterBack, onLeaveBack.
            markers: false, 
            start: "-100 50%", //animation box starts, scroller start
            end: "bottom 50%", //animation box ends, scroller end
        },
        opacity:1,
    }

    
)

gsap.to(".contact-content", 1.2,
  {
      scrollTrigger: {
          trigger:".contact-content", // you can change the trigger class if you want animation to happen on crossing different div
          toggleActions: "restart none pause pause",//onEnter, onLeave, onEnterBack, onLeaveBack.
          markers: false, 
          start: "-150 50%", //animation box starts, scroller start
          end: "-20 50%", //animation box ends, scroller end
      },
      scale:20,
      opacity:1,
  }

  
)



})();



//video playeer
(() => {
const player = new Plyr('video');
})();