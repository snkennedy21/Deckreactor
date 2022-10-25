const backgrounds = {
  R: [
    "https://media.magic.wizards.com/images/wallpaper/wrenn-and-six-2x2-background-2560x1600.jpg",
    "https://media.magic.wizards.com/images/wallpaper/koll_the_forgemaster_khm_2560x1600_wallpaper_0.jpg",
    "https://media.magic.wizards.com/images/wallpaper/Blood_Sun_RIX_2560x1600_Wallpaper.jpg",
    "https://media.magic.wizards.com/images/wallpaper/Chandra_PW_2560x1600_Wallpaper.jpg",
  ],
  W: [
    "https://media.magic.wizards.com/images/wallpaper/CityofBrass_MMA_2560x1600_Wallpaper.jpg",
    "https://media.magic.wizards.com/images/wallpaper/Azor-the-Lawbringer_RIX_2560x1600_Wallpaper.jpg",
    "https://media.magic.wizards.com/images/wallpaper/Angelic-Page_A25_2560x1600_Wallpaper.jpg",
    "https://media.magic.wizards.com/images/wallpaper/Weatherlight_DAR_2560x1600_Wallpaper.jpg",
  ],
  B: [
    "https://media.magic.wizards.com/images/wallpaper/Wallpaper_Erebos_God_ofthe_Dead_2560x1600.jpg",
    "https://media.magic.wizards.com/images/wallpaper/Campaign-of-Vengeance_EMN_2560x1600_Wallpaper.jpg",
    "https://media.magic.wizards.com/images/wallpaper/PollutedDelta_2560x1600_Wallpaper.jpg",
    "https://media.magic.wizards.com/images/wallpaper/callofthenightwing_GTC_2560x1600_Wallpaper.jpg",
  ],
  U: [
    "https://media.magic.wizards.com/images/wallpaper/grand-arbiter-augustin-iv-2x2-background-2560x1600.jpg",
    "https://media.magic.wizards.com/images/wallpaper/422742_inquisitor_greyfax_2560x1600_wallpaper.jpg",
    "https://media.magic.wizards.com/images/wallpaper/tidechannel-pathway_khm_2560x1600_wallpaper.jpg",
    "https://media.magic.wizards.com/images/wallpaper/tidechannel-pathway_khm_2560x1600_wallpaper.jpg",
  ],
  G: [
    "https://media.magic.wizards.com/images/wallpaper/sparas_headquarters_kieran_yanner_2560x1600_wpoozxbqpcw.jpg",
    "https://media.magic.wizards.com/images/wallpaper/quandrixcommand_stx_2560x1600_wallpaper.jpg",
    "https://media.magic.wizards.com/images/wallpaper/timbercrown-pathway_sld_2560x1600_wallpaper.jpg",
    "https://media.magic.wizards.com/images/wallpaper/Tarmogoyf_DGM_2560x1600_Wallpaper.jpg",
  ],
}

const colors_to_abbrevs = {
  "blue": "U",
  "green": "G",
  "black": "B",
  "red": "R",
  "white": "W",
}

function getBackground(color) {
  console.log(Object.keys(backgrounds))
  if (color.toLowerCase() in Object.keys(colors_to_abbrevs)) {
    color = colors_to_abbrevs[color.toLowerCase()];
  }
  if (Object.keys(backgrounds).includes(color)) {
    return backgrounds[color][Math.floor(Math.random() * backgrounds[color].length)];
  } else {
    const allBackgrounds = backgrounds.R.concat(backgrounds.W, backgrounds.B, backgrounds.G, backgrounds.U);
    return (
      allBackgrounds[Math.floor(Math.random() * allBackgrounds.length)]
    )
  }
}

export default getBackground;