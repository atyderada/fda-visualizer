<template>
    <transition name="fade">
        <div class="cs-loader">
            <div class="cs-loader-inner">
                <label>	●</label>
                <label>	●</label>
                <label>	●</label>
                <label>	●</label>
                <label>	●</label>
                <label>	●</label>
            </div>
        </div>
    </transition>
</template>

<style scoped lang="css">
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.2s;
}
.fade-enter, .fade-leave-to {
  opacity: 0.4;
}
.cs-loader {
  width: 100vw;
  height: 80vh;
  /* position: absolute; */
  background-color: white;
}
.cs-loader-inner {
  transform: translateY(-50%);
  top: 50%;
  position: absolute;
  width: calc(100% - 200px);
  color: #AA92C7;
  padding: 0 100px;
  text-align: center;
}
.cs-loader-inner label {
  font-size: 20px;
  opacity: 0;
  display:inline-block;
}
.cs-loader-inner label:nth-child(6) {
  -webkit-animation: lol 2s infinite ease-in-out;
  animation: lol 2s infinite ease-in-out;
}
.cs-loader-inner label:nth-child(5) {
  -webkit-animation: lol 2s 100ms infinite ease-in-out;
  animation: lol 2s 100ms infinite ease-in-out;
}
.cs-loader-inner label:nth-child(4) {
  -webkit-animation: lol 2s 200ms infinite ease-in-out;
  animation: lol 2s 200ms infinite ease-in-out;
}
.cs-loader-inner label:nth-child(3) {
  -webkit-animation: lol 2s 300ms infinite ease-in-out;
  animation: lol 2s 300ms infinite ease-in-out;
}
.cs-loader-inner label:nth-child(2) {
  -webkit-animation: lol 2s 400ms infinite ease-in-out;
  animation: lol 2s 400ms infinite ease-in-out;
}
.cs-loader-inner label:nth-child(1) {
  -webkit-animation: lol 2s 500ms infinite ease-in-out;
  animation: lol 2s 500ms infinite ease-in-out;
}
@keyframes lol {
  0% {
    opacity: 0;
    transform: translateX(-300px);
  }
  33% {
    opacity: 1;
    transform: translateX(0px);
  }
  66% {
    opacity: 1;
    transform: translateX(0px);
  }
  100% {
    opacity: 0;
    transform: translateX(300px);
  }
}
@-webkit-keyframes lol {
  0% {
    opacity: 0;
    -webkit-transform: translateX(-300px);
  }
  33% {
    opacity: 1;
    -webkit-transform: translateX(0px);
  }
  66% {
    opacity: 1;
    -webkit-transform: translateX(0px);
  }
  100% {
    opacity: 0;
    -webkit-transform: translateX(300px);
  }
}
@-webkit-keyframes fadeIn {
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
}
@keyframes fadeIn {
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
}
@-webkit-keyframes fadeOut {
    from {
        opacity: 1;
    }
    to {
        opacity: 0;
    }
}
@keyframes fadeOut {
    from {
        opacity: 1;
    }
    to {
        opacity: 0;
    }
}
</style>