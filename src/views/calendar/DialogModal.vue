<template>
  <div class="pa-4 text-center">
    <v-dialog v-model="dialog" max-width="600">
      <v-card prepend-icon="pi pi-user-edit" title="Dokończ rezerwację">
        <v-card-text>
          <v-row dense>

            <v-col cols="12" md="6" sm="6">
              <v-text-field label="Imię*" v-model="firstName" required></v-text-field>
            </v-col>

            <v-col cols="12" md="6" sm="6">
              <v-text-field label="Nazwisko*" v-model="lastName" required></v-text-field>
            </v-col>

            <v-col cols="12" sm="12">
              <v-text-field hint="rezerwacja będzie nosić nazwę podaną w tym polu" label="Prowadzony kurs*" v-model="course" required></v-text-field>
            </v-col>
          </v-row>

          <small class="text-caption text-medium-emphasis">*pole wymagane</small>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn text="Zamknij" variant="plain" @click="$emit('changeDialogValue', false)"></v-btn>

          <v-btn color="primary" text="Gotowe" variant="tonal" @click="submitForm"></v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup>
  import { ref, defineProps, watch, defineEmits } from 'vue'

  const emit = defineEmits(['formSubmitted']);

  const props = defineProps({
    childProp: Boolean 
  });
  
  const dialog = ref(props.childProp)

  watch(() => props.childProp, (newValue) => {
    dialog.value = newValue;
  });

  const firstName = ref('');
  const lastName = ref('');
  // const email = ref('');
  const course = ref('');

  const submitForm = () => {

    if (!firstName.value || !lastName.value || !course.value) {
      alert("Wypełnij wszystkie pola.")
      return; 
    }

    console.log('Submitting form...');
    console.log('First Name:', firstName.value);
    console.log('Last Name:', lastName.value);
    // console.log('Email:', email.value);
    console.log('Course:', course.value);

    const formData = { firstName: firstName.value, lastName: lastName.value, course: course.value };

    emit('formSubmitted', formData);

    dialog.value = false;
  };

</script>