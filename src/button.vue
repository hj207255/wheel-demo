<template>
  <button @click="$emit('click')" class="g-button" :class="{[`icon-${iconPosition}`]:true}">
    <g-icon v-if="icon && !loading" :name="icon"></g-icon>
    <g-icon v-if="loading" class="loading icon" name="jiazai"></g-icon>
    <div class="content">
      <slot></slot>
    </div>
  </button>
</template>
<script>
  import Icon from './icon'
  
  export default{
    components: {
      'g-icon': Icon
    },
    // props: ['icon','iconPosition']
    props: {
      "icon": {},
      "loading": {
        type: Boolean,
        default: false
      },
      "iconPosition": {
        type: String,
        default: 'left',
        validator: function(value){
          return !(value!=='left'&&value!=='right')
        }
      }
    }
  }
</script>
<style lang="scss">
  @keyframes xuanzhuan {
    0%{transform: rotate(0deg);}
    100%{transform: rotate(360deg);}
  }
  .g-button {
    font-size: var(--font-size);
    height: var(--button-height);
    padding: 0 1em;
    border-radius: var(--border-radius);
    border: 1px solid var(--border-color);
    background: var(--button-bg);
    display: inline-flex;
    justify-content: center;
    align-items: center;
    vertical-align: middle;
    &:hover {
    border-color: var(--border-color-hover);
    }
    &:active {
      background: var(--button-active-bg);
    }
    &:focus {
      outline: none;
    }
    &.icon-right {
      > .g-icon {order: 2; margin-left: .3em;}
      > .content {order: 1;}
    }
    &.icon-left {
      > .g-icon {order: 1; margin-right: .3em;}
      > .content {order: 2;}
    }
    & .loading {
      animation: xuanzhuan 3s infinite linear;
    }
  }
</style>