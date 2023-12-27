<template>
  <header class="topbar">
    <section class="content container">
      <a class="title" href="/">
        <i class="ri-user-fill ri-2x icon"></i>
        <h1>trombi-fil</h1>
      </a>

      <div class="right-side">
        <button @click="openModal">Créer un étudiant</button>
      </div>
    </section>
  </header>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  methods: {
    openModal() {
      this.$emit('open-modal');
    },
  }

})

</script>

<style scoped>
.topbar {
  background-color: var(--neutral-color);

  & .content {

    display: flex;
    justify-content: space-between;
    align-items: center;

    & .title {
      padding: 2rem 0;
      font-size: 20px;
      color: var(--text);

      & * {
        display: inline-block;
        vertical-align: middle;
      }

      & .icon {
        color: var(--secondary-color);
      }
    }

    & .right-side {
      & button {
        cursor: pointer;
        background-color: var(--secondary-light-color);
        font-size: medium;
        font-weight: 700;
        padding: 15px 25px;
        border-radius: 5px;
        transition: all .5s cubic-bezier(0.23, 1, 0.320, 1);

        &:hover {
          background-color: var(--secondary-color);
          color: var(--neutral-color);
        }
      }
    }
  }
}
</style>