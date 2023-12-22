<template>
    <article class="card">
        <div class="infos">
            <div class="icon">
                <Avatar :size="80" :name="student.firstName + ' ' + student.lastName" variant="beam" :colors="colors" />
                <!-- <p>icon</p> -->
            </div>
            <div class="name">
                <p>{{ truncateText(student.firstName, 10) }}</p>
                <p class="last-name">{{ truncateText(student.lastName, 10) }}</p>
            </div>
        </div>
        <p class="promo"> {{ student.promotion }} </p>
        <p class="description">
            {{ student.description }}
        </p>
        <img class="company-logo" :src="getCompanyLogoPath" :alt="student.companyName">
    </article>
</template>


<script lang="ts">
import { defineComponent, type PropType } from 'vue';
import type { StudentInfo } from '../interfaces/StudentInfo';
import Avatar from "vue-boring-avatars";
import { colors } from '../interfaces/colors';

export default defineComponent({
    props: {
        student: {
            required: true,
            type: Object as PropType<StudentInfo>
        }
    },
    data() {
        return {
            imagePath: '@/assets/images/companies/',
            colors
        }
    },
    computed: {
        getCompanyLogoPath() {
            return new URL(`../assets/images/companies/${this.student.companyLogo}`, import.meta.url).href;
        },
    },
    methods: {
        truncateText(text: string, maxLength: number) {
            return text.length <= maxLength ? text : text.substring(0, maxLength) + "...";
        }
    },
    components: {
        Avatar
    },
});

</script>

<style scoped>
.card {
    background-color: var(--neutral-color);
    padding: 20px;
    border-radius: 15px;
    box-shadow: 6px 6px 4px rgba(235, 226, 217, .23);
    height: 300px;
    width: 400px;
    position: relative;

    & .infos {
        display: flex;
        font-family: 'Montserrat', sans-serif;
        font-size: 25px;

        & .icon {
            margin-right: 30px;
        }

        & .last-name {
            font-weight: 800;
        }

    }

    & .promo {
        background-color: var(--primary-color);
        padding: 5px 15px;
        display: inline-block;
        border-radius: 20px;
        color: var(--neutral-color);
        font-weight: 700;
        font-size: 15px;
        margin: 10px 0;
    }

    & .description {
        font-size: 14px;
        max-width: 400px;
    }

    & .company-logo {
        position: absolute;
        bottom: 10px;
        right: 10px;
        max-width: 100px;
    }

}
</style>../interfaces/StudentInfo