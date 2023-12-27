<script lang="ts">
import TopBar from './components/TopBar.vue';
import PromoSelector from './components/PromoSelector.vue';
import StudentCard from './components/StudentCard.vue';
import type { StudentInfo } from './interfaces/StudentInfo';
import StudentForm from './components/StudentForm.vue';
import { defineComponent, isProxy, ref, toRaw, type Ref } from 'vue';

let promoChoices = [2024, 2025, 2026];

let studentList: Ref<StudentInfo[]> = ref([]);

let fullList: StudentInfo[] = []

const modalActive = ref(false);

export default defineComponent({
  components: {
    TopBar, StudentForm, PromoSelector, StudentCard
  },
  data() {
    return {
      studentList,
      promoChoices,
      modalActive,
      selectedPromo: 'Toutes',
    }
  },
  mounted() {
    this.fetchStudents();
  },
  methods: {
    toggleModal() {
      modalActive.value = !modalActive.value;
    },
    addStudent(student: any) {
      if (isProxy(student)) {
        const rawStudent = toRaw(student);
        studentList.value.unshift(rawStudent);
      }
    },
    getActivePromotion(promotion: string) {
      this.selectedPromo = promotion;
      const selectedPromoString = this.selectedPromo.toString();

      const filteredList = promotion !== 'Toutes'
        ? fullList.filter(student => student.promotion.toString() === selectedPromoString)
        : fullList;

      studentList.value = filteredList;
    },
    async fetchStudents() {
      try {
        const response = await fetch('http://localhost:3000/students');
        const data = await response.json()
        studentList.value = data;
        fullList = studentList.value;
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
  },
});

</script>

<template>
  <TopBar @open-modal="toggleModal" />

  <main>
    <section class="container">
      <h1 class="title">Les étudiants</h1>
      <PromoSelector :promo-choices="promoChoices" @active-promo="getActivePromotion" />
    </section>

    <section class="container student-wrapper">
      <p v-if="!studentList.length">Aucun étudiant trouvé.</p>
      
      <TransitionGroup name="list">
        <StudentCard :student="student" v-for="(student, index) in studentList" :key="index" />
      </TransitionGroup>
    </section>

    <Transition name="fade">
      <StudentForm :is-active="modalActive" @close-modal="toggleModal" @submit="addStudent" />
    </Transition>
    
  </main>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(-30px);
}

.container {
  margin-top: 40px;
  font-size: 20px;

  display: flex;
  justify-content: space-between;


  & :not(.student-wrapper) {
    align-items: center;
  }

  &.student-wrapper {

    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
    
    max-width: 1280px;

    overflow-y: auto;
    height: calc(100vh - 107px - 75px - 90px);


    /* width */
    &::-webkit-scrollbar {
      width: 10px;
      cursor: pointer;
    }

    /* Track */
    &::-webkit-scrollbar-track {
      background: var(--bg-color-darker);
    }

    /* Handle */
    &::-webkit-scrollbar-thumb {
      background-clip: padding-box;
      background: var(--primary-dark-color);
    }

    /* Handle on hover */
    &::-webkit-scrollbar-thumb:hover {
      background: var(--primary-color);
    }

  }

  & .title {
    font-size: 40px;
  }

}
</style>