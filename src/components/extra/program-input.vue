<template>
    <b-card>
        
        <b-badge variant="dark" class="p-2">Write the input required in the code, example: 10 kevin </b-badge>
        <b-badge variant="transparent" class="my-2">actual input data: [ {{setInput}} ]</b-badge>
        <b-input v-model="setInput" class="mt-2" placeholder="10 kevin 99"></b-input>
    </b-card>

</template>

<script>
export default {
    name: 'input',

    computed: {

        setInput: {
            get() {
                return this.$store.state.inputData;
            },
            set(value) {
                this.$store.commit("setInputData",{data:value});
            }
        }

    }

}
</script>