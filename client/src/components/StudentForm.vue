<template>
    <section class="modal-mask" v-if="isActive">
        <section class="modal-wrapper" @click="closeModal">
            <section class="modal-container" @click.stop="">
                <span @click="closeModal" class="close-modal">&times;</span>
                <h1 class="title">Créer un étudiant</h1>
                <form @submit.prevent="submit" enctype="multipart/form-data" ref="studentForm">
                    <div class="content">
                        <article class="fields">
                            <div>
                                <label for="firstname">
                                    Prénom *
                                </label>
                                <input type="text" id="firstname" required v-model.trim="studentData.firstName" />
                            </div>
                            <div>
                                <label for="name">
                                    Nom *
                                </label>
                                <input type="text" id="name" required v-model.trim="studentData.lastName" />
                            </div>
                            <div>
                                <label for="description">
                                    Description
                                </label>
                                <textarea id="description" placeholder="Donnez une brève description de qui vous êtes."
                                    v-model.trim="studentData.description"></textarea>
                            </div>
                            <div>
                                <label for="promotion">
                                    Promotion *
                                </label>
                                <input type="number" value="2024" min="2010" max="3000" required id="promotion"
                                    v-model.number="studentData.promotion">
                            </div>
                            <div>
                                <label for="company">Entreprise *</label>
                                <input type="text" required v-model="studentData.companyName"
                                    placeholder="Nom de l'entreprise">
                                <input type="file" id="company" class="company-input" accept="image/*"
                                    ref="uploadCompanyLogo" @change="handleCompanyLogoUpload">
                                <label for="company" :class="{ 'filled-input': studentData.companyLogo !== '' }">
                                    <p>{{ studentData.companyLogo || 'Importer logo' }}</p>
                                    <i class="ri-gallery-upload-line ri-2x"></i>
                                </label>
                                <em class="note">jpg/jeg/png uniquement</em>
                            </div>
                        </article>
                        <aside class="picture">
                            <input id="profile-picture" type="file" class="profile-picture-input" accept="image/*"
                                @change="handleProfilePictureUpload" ref="uploadAvatar">
                            <label for="profile-picture" :class="{ 'filled-input': studentData.avatar !== '' }">
                                <i class="ri-gallery-upload-line ri-4x"></i>
                                <p>{{ studentData.avatar || 'Importer image' }} </p>
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
import type { StudentInfo } from './../interfaces/StudentInfo';

const uploadUrl = 'http://localhost:3000/upload';

export default defineComponent({
    props: {
        isActive: {
            required: true,
            type: Boolean
        }
    },
    data() {
        return {
            studentData: {
                firstName: '',
                lastName: '',
                description: '',
                promotion: new Date().getFullYear(),
                companyLogo: '',
                avatar: '',
            } as StudentInfo,
            companyLogo: '',
            avatar: '',
            message: '',
        }
    },
    methods: {
        closeModal() {
            this.$emit('close-modal');
        },
        async submit() {
            try {
                await fetch('http://localhost:3000/students/create', {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(this.studentData)
                });
            } catch (err) {
                console.log(err);
            }

            const companyFormData = new FormData();
            companyFormData.append('file', this.companyLogo);
            await this.uploadImage(uploadUrl, 'companies', companyFormData);

            const avatarFormData = new FormData();
            avatarFormData.append('file', this.avatar);
            await this.uploadImage(uploadUrl, 'avatars', companyFormData);

            this.$emit('submit', this.studentData);

            this.resetForm();

            this.closeModal();
        },
        async uploadImage(url: string, type: string, body: FormData) {
            try {
                await fetch(`${url}/${type}`, {
                    method: 'POST',
                    body
                }).catch(console.error)
            } catch (err) {
                console.error(err);
            }
        },
        handleCompanyLogoUpload() {
            const files: FileList | null = (this.$refs.uploadCompanyLogo as HTMLInputElement).files;
            if (files && files.length > 0) {
                this.companyLogo = files.item(0) as any;
            }
            this.studentData.companyLogo = this.handleImageInput(this.$refs.uploadCompanyLogo as HTMLInputElement);
        },
        handleProfilePictureUpload() {
            const files: FileList | null = (this.$refs.uploadAvatar as HTMLInputElement).files;
            if (files && files.length > 0) {
                this.avatar = files.item(0) as any;
            }
            this.studentData.avatar = this.handleImageInput(this.$refs.uploadAvatar as HTMLInputElement);
        },
        handleImageInput(inputElement: HTMLInputElement) {
            const files: FileList | null = inputElement.files;
            if (files && files.length > 0) {
                return files.item(0)?.name ?? '';
            }
            return '';
        },
        resetForm() {
            this.studentData = {
                avatar: '',
                companyName: '',
                description: '',
                firstName: '',
                lastName: '',
                promotion: new Date().getFullYear(),
                companyLogo: ''
            };
        }
    },
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
            max-height: calc(100vh - 50px);
            overflow-y: auto;

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

                        &.filled-input {
                            border: 1px solid var(--primary-color);
                            color: var(--primary-color);
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
                        border: 1px solid var(--headings);

                        & p {
                            font-size: 13px;
                        }

                        &.filled-input {
                            border: 1px solid var(--primary-color);
                            color: var(--primary-color);
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
                cursor: pointer;
            }

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
    }
}
</style>