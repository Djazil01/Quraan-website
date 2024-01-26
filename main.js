let audio = document.querySelector(".quraanplayer"),
  surahscontainer = document.querySelector(".surahs"),
  ayah = document.querySelector(".ayah"),
  next = document.querySelector(".next"),
  prev = document.querySelector(".prev"),
  play = document.querySelector(".play");

function getsurahs() {
  fetch("https://api.quran.gading.dev/surah")
    /**to get surat data */
    .then((response) => response.json())
    .then((data) => {
      for (let surah in data.data) {
        surahscontainer.innerHTML += `
        
        <div>
            <p>${data.data[surah].name.long}  </p> 
           <p>${data.data[surah].name.transliteration.en}</p>
        </div>
        
        `;
      }
    });
}
getsurahs();
