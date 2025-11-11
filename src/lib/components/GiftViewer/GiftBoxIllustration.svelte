<script lang="ts">
  import classNames from "classnames";

  type Props = {
    animateRibbon?: boolean;
    animateBox?: boolean;
    class?: string;
  };
  let props: Props = $props();

  const PADDING = 20;

  const width = 279 + PADDING;
  const height = 226 + PADDING;
</script>

<svg
  class={props.class}
  {width}
  {height}
  viewBox={`-${PADDING} -${PADDING} ${width + PADDING} ${height + PADDING}`}
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
>
  <!-- Box bottom -->
  <path
    class={classNames("transform-fill-box", {
      "animate-bottom-box": props.animateBox
    })}
    d="M227.955 95.4727V207.973C227.955 215.981 221.463 222.473 213.455 222.473H61.4546C53.4465 222.473 46.9546 215.981 46.9546 207.973V95.4727H227.955Z"
    fill="url(#paint0_linear_82_3262)"
    stroke="#C52024"
  />
  <mask
    id="path-2-outside-1_82_3262"
    maskUnits="userSpaceOnUse"
    x="41.2954"
    y="40.9727"
    width="194"
    height="62"
    fill="black"
  >
    <rect fill="white" x="41.2954" y="40.9727" width="194" height="62" />
    <path
      d="M221.591 41.9727C223.767 41.9727 225.694 43.3801 226.355 45.4531L233.375 67.4531C233.676 68.3974 233.681 69.3471 233.455 70.2188V96.9727C233.455 99.734 231.216 101.972 228.455 101.973H47.4546C44.6932 101.973 42.4546 99.7341 42.4546 96.9727V70.2188C42.2285 69.347 42.2334 68.3975 42.5347 67.4531L49.5532 45.4531C50.2146 43.3801 52.141 41.9727 54.3169 41.9727H221.591Z"
    />
  </mask>
  <!-- Box top -->
  <path
    class={classNames("transform-fill-box", {
      "animate-top-box": props.animateBox
    })}
    d="M221.591 41.9727C223.767 41.9727 225.694 43.3801 226.355 45.4531L233.375 67.4531C233.676 68.3974 233.681 69.3471 233.455 70.2188V96.9727C233.455 99.734 231.216 101.972 228.455 101.973H47.4546C44.6932 101.973 42.4546 99.7341 42.4546 96.9727V70.2188C42.2285 69.347 42.2334 68.3975 42.5347 67.4531L49.5532 45.4531C50.2146 43.3801 52.141 41.9727 54.3169 41.9727H221.591Z"
    fill="#F9443D"
  />
  <!-- Box top outline -->
  <path
    class={classNames("transform-fill-box", {
      "animate-top-box": props.animateBox
    })}
    d="M226.355 45.4531L225.402 45.7571V45.7571L226.355 45.4531ZM233.375 67.4531L234.327 67.1492L234.327 67.1492L233.375 67.4531ZM233.455 70.2188L232.487 69.9677L232.455 70.0912V70.2188H233.455ZM228.455 101.973V102.973H228.455L228.455 101.973ZM42.4546 96.9727H41.4546H42.4546ZM42.4546 70.2188H43.4546V70.0912L43.4226 69.9677L42.4546 70.2188ZM42.5347 67.4531L41.582 67.1492L41.582 67.1492L42.5347 67.4531ZM49.5532 45.4531L48.6005 45.1492L48.6005 45.1492L49.5532 45.4531ZM221.591 41.9727V42.9727C223.332 42.9727 224.873 44.0987 225.402 45.7571L226.355 45.4531L227.308 45.1492C226.514 42.6616 224.202 40.9727 221.591 40.9727V41.9727ZM226.355 45.4531L225.402 45.7571L232.422 67.7571L233.375 67.4531L234.327 67.1492L227.308 45.1492L226.355 45.4531ZM233.375 67.4531L232.422 67.757C232.664 68.5153 232.667 69.2725 232.487 69.9677L233.455 70.2188L234.423 70.4698C234.694 69.4217 234.688 68.2794 234.327 67.1492L233.375 67.4531ZM233.455 70.2188H232.455V96.9727H233.455H234.455V70.2188H233.455ZM233.455 96.9727H232.455C232.455 99.1816 230.664 100.973 228.455 100.973L228.455 101.973L228.455 102.973C231.768 102.972 234.455 100.286 234.455 96.9727H233.455ZM228.455 101.973V100.973H47.4546V101.973V102.973H228.455V101.973ZM47.4546 101.973V100.973C45.2455 100.973 43.4546 99.1818 43.4546 96.9727H42.4546H41.4546C41.4546 100.286 44.1409 102.973 47.4546 102.973V101.973ZM42.4546 96.9727H43.4546V70.2188H42.4546H41.4546V96.9727H42.4546ZM42.4546 70.2188L43.4226 69.9677C43.2422 69.2724 43.2454 68.5155 43.4874 67.7571L42.5347 67.4531L41.582 67.1492C41.2214 68.2795 41.2148 69.4216 41.4866 70.4698L42.4546 70.2188ZM42.5347 67.4531L43.4874 67.7571L50.5059 45.7571L49.5532 45.4531L48.6005 45.1492L41.582 67.1492L42.5347 67.4531ZM49.5532 45.4531L50.5059 45.7571C51.035 44.0987 52.5762 42.9727 54.3169 42.9727V41.9727V40.9727C51.7057 40.9727 49.3942 42.6616 48.6005 45.1492L49.5532 45.4531ZM54.3169 41.9727V42.9727H221.591V41.9727V40.9727H54.3169V41.9727Z"
    fill="#C52024"
    mask="url(#path-2-outside-1_82_3262)"
  />
  <!-- Box top shadow 1 -->
  <rect
    class={classNames({
      "opacity-0 transition": props.animateBox
    })}
    opacity="0.1"
    x="47.4546"
    y="95.9727"
    width="180"
    height="19"
    fill="black"
  />
  <!-- Box top shadow 2 -->
  <path
    class={classNames("transform-fill-box", {
      "animate-top-box": props.animateBox
    })}
    d="M42.4546 68.9727H233.455V96.9727C233.455 99.7341 231.216 101.973 228.455 101.973H47.4546C44.6932 101.973 42.4546 99.7341 42.4546 96.9727V68.9727Z"
    fill="url(#paint1_linear_82_3262)"
  />
  <!-- Box top misc -->
  <path
    class={classNames("transform-fill-box", {
      "animate-top-box": props.animateBox
    })}
    d="M49.5537 45.4529C50.215 43.3799 52.1412 41.9727 54.3171 41.9727H221.592C223.768 41.9727 225.694 43.3799 226.356 45.4529L233.375 67.4529C234.404 70.6784 231.997 73.9727 228.611 73.9727H47.2981C43.9125 73.9727 41.5056 70.6784 42.5347 67.4529L49.5537 45.4529Z"
    fill="#F9443D"
  />
  <!-- Ribbon right -->
  <path
    class={classNames("transform-fill-box", {
      "animate-right-ribbon": props.animateRibbon
    })}
    d="M239.409 38.4009C251.331 36.9959 264.634 37.3655 276.142 42.0093L277.182 42.4292L276.174 42.9214L253.285 54.1216C257.989 59.0984 267.516 70.5308 271.418 80.2866L272.029 81.811L270.672 80.8853C265.448 77.3194 256.1 71.8343 245.066 66.9927C234.028 62.1494 221.335 57.9647 209.413 56.9712L208.884 56.9272L208.959 56.4019L210.459 45.9019L210.5 45.6187L210.764 45.5103C216.888 42.9937 227.482 39.8064 239.409 38.4009Z"
    fill="url(#paint2_linear_82_3262)"
    stroke="url(#paint3_linear_82_3262)"
  />
  <!-- Ribbon left -->
  <path
    class={classNames("transform-fill-box", {
      "animate-left-ribbon": props.animateRibbon
    })}
    d="M39.0005 38.4009C27.0786 36.9959 13.7756 37.3655 2.26709 42.0093L1.22705 42.4292L2.23486 42.9214L25.1245 54.1216C20.4198 59.0984 10.8932 70.5308 6.99072 80.2866L6.38037 81.811L7.73682 80.8853C12.9613 77.3194 22.3094 71.8343 33.3433 66.9927C44.381 62.1494 57.0741 57.9647 68.9966 56.9712L69.5249 56.9272L69.4497 56.4019L67.9497 45.9019L67.9087 45.6187L67.645 45.5103C61.5215 42.9937 50.9268 39.8064 39.0005 38.4009Z"
    fill="url(#paint4_linear_82_3262)"
    stroke="url(#paint5_linear_82_3262)"
  />
  <!-- Ribbon loop right -->
  <path
    class={classNames("transform-fill-box", {
      "animate-right-ribbon-loop": props.animateRibbon
    })}
    d="M201.464 0.934082C207.306 -0.0965158 212.658 0.613833 216.777 4.09033C227.713 13.3202 232.848 26.0583 231.645 37.1274C230.438 48.235 222.851 57.5932 208.537 59.9663C196.568 61.9504 183.923 62.3329 172.932 61.1489C161.964 59.9674 152.558 57.217 147.141 52.8628L146.904 52.6714L146.964 52.3726L150.964 32.8726L150.997 32.7183L151.11 32.6108C158.041 26.0139 170.358 15.5115 182.946 8.33057C189.237 4.74128 195.627 1.96403 201.464 0.934082Z"
    fill="url(#paint6_linear_82_3262)"
    stroke="url(#paint7_linear_82_3262)"
  />
  <!-- Ribbon loop left -->
  <path
    class={classNames("transform-fill-box", {
      "animate-left-ribbon-loop": props.animateRibbon
    })}
    d="M77.3062 0.934082C71.4648 -0.0965158 66.1129 0.613833 61.9937 4.09033C51.0578 13.3202 45.9225 26.0583 47.1255 37.1274C48.3328 48.235 55.9195 57.5932 70.2339 59.9663C82.2024 61.9504 94.8476 62.3329 105.838 61.1489C116.806 59.9674 126.213 57.217 131.629 52.8628L131.867 52.6714L131.806 52.3726L127.806 32.8726L127.774 32.7183L127.661 32.6108C120.73 26.0139 108.412 15.5115 95.8247 8.33057C89.5331 4.74128 83.1434 1.96403 77.3062 0.934082Z"
    fill="url(#paint8_linear_82_3262)"
    stroke="url(#paint9_linear_82_3262)"
  />
  <!-- Ribbon loop right shadow -->
  <path
    class={classNames("transform-fill-box", {
      "animate-right-ribbon-loop": props.animateRibbon
    })}
    d="M200.651 37.1558C207.838 36.0358 214.228 36.2389 218.238 38.1099C220.259 39.053 221.72 40.4427 222.325 42.3374C222.927 44.2235 222.648 46.5097 221.409 49.1831C216.449 59.8832 204.098 63.8056 191.474 64.3403C178.821 64.8762 165.661 62.0253 158.75 58.9292L158.136 58.6538L158.577 58.145C168.21 47.025 186.255 39.399 200.651 37.1558Z"
    fill="#B52930"
    stroke="#9D131A"
  />
  <!-- Ribbon loop left shadow -->
  <path
    class={classNames("transform-fill-box", {
      "animate-left-ribbon-loop": props.animateRibbon
    })}
    d="M76.6226 38.084C69.3147 37.0472 62.8648 37.2921 58.9507 39.0996C56.9781 40.0105 55.5857 41.3506 55.1216 43.1797C54.661 44.9954 55.1493 47.1639 56.6401 49.6641C59.6325 54.6821 64.6105 57.9736 70.4507 60.0498C76.2905 62.1258 83.0307 63.0009 89.6138 63.1641C96.2002 63.3273 102.652 62.778 107.929 61.9912C113.193 61.2064 117.328 60.1792 119.263 59.3691L119.9 59.1025L119.448 58.5811C114.619 53.0076 107.564 48.4048 99.9087 44.9385C92.2494 41.4703 83.9569 39.1246 76.6226 38.084Z"
    fill="#B52930"
    stroke="#9D131A"
  />
  <!-- Ribbon middle -->
  <path
    class={classNames("transform-fill-box", {
      "animate-middle-ribbon": props.animateRibbon
    })}
    d="M134.921 26.3057C136.482 26.3164 138.325 26.4146 140.468 26.4727C142.588 26.53 144.351 26.5591 145.805 26.6328C147.257 26.7064 148.44 26.8261 149.398 27.0752C150.364 27.3267 151.131 27.7174 151.721 28.3516C152.307 28.9811 152.679 29.807 152.94 30.8516C153.426 32.7946 154.529 35.253 155.527 37.249C156.023 38.2418 156.489 39.1107 156.831 39.7314C157.001 40.0416 157.14 40.2899 157.237 40.46C157.285 40.5447 157.323 40.6102 157.348 40.6543C157.361 40.6762 157.371 40.693 157.377 40.7041C157.379 40.7069 157.38 40.7098 157.381 40.7119L157.382 40.7129C157.384 40.716 157.387 40.7208 157.39 40.7266C157.397 40.7381 157.408 40.7546 157.421 40.7764C157.448 40.8202 157.487 40.885 157.536 40.9678C157.634 41.1333 157.772 41.3735 157.939 41.6748C158.272 42.2776 158.716 43.1277 159.161 44.1182C160.042 46.0831 160.955 48.6629 160.955 50.9727C160.955 52.3674 159.893 53.3683 158.494 54.0791C157.073 54.8008 155.14 55.3143 153.04 55.6777C148.838 56.4046 143.815 56.5553 140.463 56.4727C131.487 56.826 125.051 55.2756 121.378 52.9639C119.542 51.8079 118.348 50.4296 117.93 48.9561C117.505 47.455 117.912 45.9492 119.082 44.6396C121.153 42.3215 121.898 40.717 122.487 38.9736C123.082 37.2108 123.54 35.2119 125.006 32.251C126.675 28.8807 128.355 27.3063 130.808 26.6768C132.002 26.3704 133.353 26.2949 134.921 26.3057Z"
    fill="url(#paint10_linear_82_3262)"
    stroke="url(#paint11_linear_82_3262)"
  />
  <!-- Ribbon vertical -->
  <rect
    class={classNames("transform-fill-box", {
      "animate-vertical-ribbon": props.animateRibbon
    })}
    x="116.955"
    y="53.4727"
    width="46"
    height="172"
    rx="8.5"
    fill="url(#paint12_linear_82_3262)"
    stroke="#C52024"
  />
  <defs>
    <linearGradient
      id="paint0_linear_82_3262"
      x1="227.455"
      y1="145.973"
      x2="47.4546"
      y2="145.973"
      gradientUnits="userSpaceOnUse"
    >
      <stop stop-color="#FA6157" />
      <stop offset="0.0983215" stop-color="#C52024" />
      <stop offset="0.917205" stop-color="#CD3236" />
      <stop offset="1" stop-color="#FA6157" />
    </linearGradient>
    <linearGradient
      id="paint1_linear_82_3262"
      x1="42.4546"
      y1="101.973"
      x2="233.455"
      y2="101.973"
      gradientUnits="userSpaceOnUse"
    >
      <stop stop-color="#FA6157" />
      <stop offset="0.0885729" stop-color="#CD3236" />
      <stop offset="0.884867" stop-color="#CD3236" />
      <stop offset="1" stop-color="#FA6157" />
    </linearGradient>
    <linearGradient
      id="paint2_linear_82_3262"
      x1="270.455"
      y1="40.9727"
      x2="229.955"
      y2="67.9727"
      gradientUnits="userSpaceOnUse"
    >
      <stop offset="0.169137" stop-color="#F6E343" />
      <stop offset="1" stop-color="#F9443D" />
    </linearGradient>
    <linearGradient
      id="paint3_linear_82_3262"
      x1="267.955"
      y1="39.9727"
      x2="236.955"
      y2="61.4727"
      gradientUnits="userSpaceOnUse"
    >
      <stop stop-color="#F8DF46" />
      <stop offset="1" stop-color="#C52024" />
    </linearGradient>
    <linearGradient
      id="paint4_linear_82_3262"
      x1="7.95459"
      y1="40.9727"
      x2="48.4546"
      y2="67.9727"
      gradientUnits="userSpaceOnUse"
    >
      <stop offset="0.169137" stop-color="#F6E343" />
      <stop offset="1" stop-color="#F9443D" />
    </linearGradient>
    <linearGradient
      id="paint5_linear_82_3262"
      x1="10.4546"
      y1="39.9727"
      x2="41.4546"
      y2="61.4727"
      gradientUnits="userSpaceOnUse"
    >
      <stop stop-color="#F8DF46" />
      <stop offset="1" stop-color="#C52024" />
    </linearGradient>
    <linearGradient
      id="paint6_linear_82_3262"
      x1="226.455"
      y1="17.9726"
      x2="155.455"
      y2="50.9726"
      gradientUnits="userSpaceOnUse"
    >
      <stop stop-color="#FBC33E" />
      <stop offset="0.0995261" stop-color="#F6E343" />
      <stop offset="0.494792" stop-color="#FFCC50" />
      <stop offset="1" stop-color="#F94E3E" />
    </linearGradient>
    <linearGradient
      id="paint7_linear_82_3262"
      x1="221.228"
      y1="3.55737"
      x2="179.153"
      y2="29.3597"
      gradientUnits="userSpaceOnUse"
    >
      <stop stop-color="#C57920" />
      <stop offset="1" stop-color="#F8DF46" />
    </linearGradient>
    <linearGradient
      id="paint8_linear_82_3262"
      x1="52.3159"
      y1="17.9726"
      x2="123.316"
      y2="50.9726"
      gradientUnits="userSpaceOnUse"
    >
      <stop stop-color="#FBC33E" />
      <stop offset="0.0995261" stop-color="#F6E343" />
      <stop offset="0.494792" stop-color="#FFCC50" />
      <stop offset="1" stop-color="#F94E3E" />
    </linearGradient>
    <linearGradient
      id="paint9_linear_82_3262"
      x1="57.5429"
      y1="3.55737"
      x2="99.6172"
      y2="29.3597"
      gradientUnits="userSpaceOnUse"
    >
      <stop stop-color="#C57920" />
      <stop offset="1" stop-color="#F8DF46" />
    </linearGradient>
    <linearGradient
      id="paint10_linear_82_3262"
      x1="139.36"
      y1="26.8047"
      x2="139.36"
      y2="56.0229"
      gradientUnits="userSpaceOnUse"
    >
      <stop stop-color="#F33A36" />
      <stop offset="1" stop-color="#FFCC50" />
    </linearGradient>
    <linearGradient
      id="paint11_linear_82_3262"
      x1="139.36"
      y1="26.8047"
      x2="139.36"
      y2="56.0229"
      gradientUnits="userSpaceOnUse"
    >
      <stop stop-color="#FEB74D" />
      <stop offset="1" stop-color="#F54E3A" />
    </linearGradient>
    <linearGradient
      id="paint12_linear_82_3262"
      x1="139.955"
      y1="53.9727"
      x2="139.955"
      y2="224.973"
      gradientUnits="userSpaceOnUse"
    >
      <stop stop-color="#FF6B39" />
      <stop offset="0.125" stop-color="#FBC33E" />
      <stop offset="0.682292" stop-color="#FBC33E" />
      <stop offset="1" stop-color="#FF6B39" />
    </linearGradient>
  </defs>
</svg>
