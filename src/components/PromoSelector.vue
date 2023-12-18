<template>
    <article class="promo-selector">
        <h3 class="title">PROMOTIONS</h3>

        <aside class="wrapper">
            <button v-for="promo in promotions" :key="promo" class="promo-btn" @click="setActive(promo)"
                :class="{ 'active': promo == active }">
                {{ promo }}
            </button>
            <div class="animation"></div>
        </aside>

    </article>
</template>


<style scoped>
.promo-selector {

    & .title {
        font-size: small;
        text-align: right;
    }

    & .wrapper {
        background-color: var(--primary-light-color);
        padding: 10px 0;
        border-radius: 5px;
        position: relative;

        & .animation {
            position: absolute;
            height: 100%;
            width: 84px;
            top: 0;
            z-index: 0;
            background: var(--primary-color);
            border-radius: 5px;
            transition: all .5s ease 0s;
        }

        & .promo-btn {
            font-family: 'Hind', sans-serif;
            font-weight: 500;
            color: var(--primary-dark-color);
            font-size: 15px;
            padding: 6px 20px;
            cursor: pointer;
            margin: 0;
            line-height: 20px;
            z-index: 1;
            position: relative;
            transition: color .2s ease-in;


            &:hover{
                color: var(--primary-color);
            }

            &.active {
                color: var(--neutral-color);
                font-weight: 600;
                transition: all .5s ease .2s;
            }
        }


        & .promo-btn:nth-child(1).active~.animation {
            width: 84px;
            transform: translateX(0);
        }

        & .promo-btn:nth-child(2).active~.animation {
            width: 70px;
            transform: translateX(calc(86px*1));
        }

        & .promo-btn:nth-child(3).active~.animation {
            width: 70px;
            transform: translateX(calc(86px*2 - 15px));
        }

        & .promo-btn:nth-child(4).active~.animation {
            width: 70px;
            transform: translateX(calc(86px*3 - 30px));
        }

    }

}
</style>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    props: {
        promoChoices: {
            type: Array<number | string>,
            required: true,
            default: () => [2024],
        },
    },
    data() {
        const promotions: Array<number | string> = ['Toutes', ...this.promoChoices];
        const active = promotions[0];
        return {
            promotions,
            active,
        };
    },
    methods: {
        setActive(promotion: number | string) {
            this.active = promotion;

            const buttons = document.getElementsByClassName("promo-btn");
            Array.from(buttons).forEach(button => {
                const isSamePromotion = button.textContent?.toString() === promotion.toString();
                const isActive = button.classList.contains('active');

                if (isSamePromotion && !isActive) {
                    button.classList.add('active');
                } else if (!isSamePromotion && isActive) {
                    button.classList.remove('active');
                }
            })

        }
    }

});


</script>