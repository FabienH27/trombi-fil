<template>
    <section class="modal-mask" v-if="isActive">
        <section class="modal-wrapper" @click="closeModal">
            <section class="modal-container" @click.stop="">
                <span @click="closeModal" class="close-modal">&times;</span>
                <h1 class="title">Créer un étudiant</h1>
                <form>
                    <div class="content">
                        <article class="fields">
                            <div>
                                <label for="name">
                                    Nom
                                </label>
                                <input type="text" id="name" />
                            </div>
                            <div>
                                <label for="firstname">
                                    Prénom
                                </label>
                                <input type="text" id="firstname" />
                            </div>
                            <div>
                                <label for="description">
                                    Description
                                </label>
                                <textarea id="description"
                                    placeholder="Donnez une brève description de qui vous êtes."></textarea>
                            </div>
                            <div>
                                <label for="promotion">
                                    Promotion
                                </label>
                                <input type="number" value="2024" min="2010" max="3000" id="promotion">
                            </div>
                            <div>
                                <label>Entreprise</label>
                                <input type="file" id="company" class="company-input">
                                <label for="company">
                                    <p>Importer logo</p>
                                    <i class="ri-gallery-upload-line ri-2x"></i>
                                </label>
                                <em class="note">jpg/jeg/png uniquement</em>
                            </div>
                        </article>
                        <aside class="picture">
                            <input id="profile-picture" type="file" class="profile-picture-input">
                            <label for="profile-picture">
                                <i class="ri-gallery-upload-line ri-4x"></i>
                                <p>Importer image</p>
                            </label>
                            <p class="picture-title">Photo de profil</p>
                            <p class="note">jpg/jpeg/png uniquement</p>
                        </aside>
                    </div>
                    <button type="submit" class="submit">Valider</button>
                </form>
            </section>
        </section>
    </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    props: {
        isActive: {
            required: true,
            type: Boolean
        }
    },
    methods: {
        closeModal() {
            this.$emit('close-modal');
        },
    }
})

</script>

<style scoped>
.modal-mask {
    position: fixed;
    background-color: rgb(59, 59, 59, .3);
    height: 100%;
    width: 100%;
    top: 0;
    left: 0;
    right: 0;
    z-index: 2;
    display: table;

    & .modal-wrapper {
        display: table-cell;
        vertical-align: middle;

        & .modal-container {
            background-color: var(--neutral-color);
            width: 75%;
            margin: 0 auto;
            padding: 20px 30px;

            & .close-modal {
                font-size: 40px;
                float: right;
                cursor: pointer;

                &:hover {
                    color: var(--secondary-color);
                }
            }

            & .title {
                font-size: 30px;
                margin-top: 20px;
                margin-bottom: 30px;
            }

            & .content {
                display: flex;
                font-size: 16px;

                & input[type="file"] {
                    width: 0.1px;
                    height: 0.1px;
                    opacity: 0;
                    overflow: hidden;
                    position: absolute;
                    z-index: -1;
                }

                & .note {
                    opacity: .5;
                    font-size: 13px;
                }

                & .fields {
                    flex-grow: 1;


                    & input,
                    textarea {
                        border-radius: 5px;
                        border: 1px solid var(--headings);
                        padding: 15px 5px;
                        font-size: 16px;
                        width: 100%;
                        font-family: 'Hind', sans-serif;
                    }

                    & textarea {
                        resize: vertical;
                    }

                    & label {
                        font-weight: 400;
                        display: block;
                        margin: 8px 0;
                        font-size: 20px;
                    }

                    & .company-input+label {
                        cursor: pointer;
                        border: 1px solid var(--headings);
                        border-radius: 30px;
                        padding: 10px 20px;
                        font-size: 15px;
                        display: flex;
                        justify-content: space-between;
                        align-items: center;

                        & p {
                            opacity: .75;
                        }

                        &+.note {
                            float: right;
                        }
                    }

                }

                & .picture {
                    flex-grow: 2;
                    margin: auto;

                    & p {
                        text-align: center;
                    }

                    & .profile-picture-input+label {
                        cursor: pointer;
                        margin: auto;
                        margin-bottom: 20px;

                        width: 200px;
                        height: 200px;
                        text-align: center;
                        display: flex;
                        flex-direction: column;
                        justify-content: center;
                        border-radius: 100%;
                        border: 1.5px solid var(--headings);

                        & p {
                            font-size: 13px;
                        }
                    }

                    & .picture-title {
                        font-weight: 700;
                        font-size: 25px;
                    }
                }
            }

            & .submit {
                background-color: var(--secondary-color);
                padding: 10px 20px;
                color: var(--neutral-color);
                border-radius: 10px;
                margin: 40px auto;
                width: 15%;
                display: block;
                font-size: 16px;
                font-family: 'Montserrat', sans-serif;
                font-weight: 700;
            }
        }
    }
}
</style>