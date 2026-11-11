// Hero background videos. To add another one: put the file in /public/videos and add a line below.
// They play one after another (with a cross-fade) and loop back to the first.
// Tips: keep each file small (720p, no audio, a few MB) so the page loads fast.
export const heroVideos=[
  {src:'/videos/bg1.mp4'},
  {src:'/videos/bg2.mp4'},
  // {src:'/videos/bg3.mp4'},
]

// Look of the background – change here
export const heroVideoStyle={blur:8,overlay:.72} // blur in px, overlay = how strongly the page colour covers the video (0–1)
