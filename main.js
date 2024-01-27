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
      let allsurahs = document.querySelectorAll(".surahs div"),
        ayahsaudios,
        ayahstext;
      allsurahs.forEach((surah, index) => {
        surah.addEventListener("click", () => {
          fetch(`https://api.quran.gading.dev/surah/${index + 1}`)
            .then((response) => response.json())
            .then((data) => {
              let verses = data.data.verses;
              ayahsaudios = [];
              ayahstext = [];
              verses.forEach((verses) => {
                ayahsaudios.push(verses.audio.primary);
                ayahstext.push(verses.text.arab);
              });
              let ayahindex = 0;
              changeayah(ayahindex);
              audio.addEventListener("ended", () => {
                ayahindex++;
                if (ayahindex < ayahsaudios.length) {
                  changeayah(ayahindex);
                } else {
                  Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "surah has been ended",
                    showConfirmButton: false,
                    timer: 1500,
                  });
                  isplaying = true;
                  toggelplay();
                  ayahindex = 0;
                  changeayah(ayahindex);
                  audio.pause();
                }
              });
              next.addEventListener("click", () => {
                ayahindex < ayahsaudios.length - 1
                  ? ayahindex++
                  : (ayahindex = 0);
                changeayah(ayahindex);
              });
              prev.addEventListener("click", () => {
                ayahindex > 0 ? ayahindex-- : (ayahindex = 0);
                changeayah(ayahindex);
              });
              let isplaying = false;
              toggelplay();
              function toggelplay() {
                if (isplaying) {
                  audio.pause();
                  play.innerHTML = `<i class="fas fa-play"></i>`;
                  isplaying = false;
                } else {
                  audio.play();
                  play.innerHTML = `<i class="fas fa-pause"></i>`;
                  isplaying = true;
                }
              }
              play.addEventListener("click", toggelplay);
              function changeayah(index) {
                audio.src = ayahsaudios[index];
                ayah.innerHTML = ayahstext[index];
              }
            });
        });
      });
    });
}
getsurahs();
