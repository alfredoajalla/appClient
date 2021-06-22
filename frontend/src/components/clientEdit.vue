<script>  
import axios from 'axios';
import VueAxios from 'vue-axios';
import clientEdit from "./clientEdit.vue";

const SERVER_URL = 'http://localhost:3000/api';

export default {
  name: "clientEdit",
  props: {
    editedClient: Object,
  },
  data: () => ({
    client: {
      _id: '',
      name: '',
      phone: '',
      providers: [],
    },
    provider: '',
    providers: [],
  }),

  methods: {
    isClientProvider(provider) {
      if (this.client) {
        return this.client.providers.findIndex(p => p._id === provider._id) >= 0;
      }
      return false;
    },
    selectProvider(provider) {
      if (this.client) {
        if (!this.isClientProvider(provider)) {
          this.client.providers.push(provider._id);
        }
      }
    },
    getAllClients() {
      try {
        axios
          .get(`${SERVER_URL}/clients`)
          .then((response) => {
            this.clients = response.data;
          });
      } catch (error) {
        alert(`Failed to get client list`);
      }
    },
    deleteClient(id) {
      const response = confirm("¿Are you sure?");
      if (response) {
        this.axios
          .delete("http://localhost:3000/api/clients/" + id)
          .then((res) => {
            const clientIndex = this.clients.findIndex(c => c._id === id);
            this.clients.splice(clientIndex, 1);
          })
          .catch((err) => console.log(err));
      }
      return;
    },

    saveClient() {
      const clientCopy = Object.assign({}, this.client);
      const method = clientCopy._id ? 'put' : 'post';
      let savePromise;
      if (method === 'post') {
        delete clientCopy._id;
        savePromise = this.axios[method]("http://localhost:3000/api/clients", clientCopy);
      } else {
        savePromise = this.axios[method](`http://localhost:3000/api/clients/${clientCopy._id}`, clientCopy);
      };
      savePromise.then((res) => {
          this.getAllClients();
          this.$bvModal.hide("modalClient");
        })
        .catch((err) => console.log(err));
    },
    addProvider() {
      this.axios
        .post("http://localhost:3000/api/providers/", { name: this.provider })
        .then((res) => {
          this.getAllProviders();
        })
        .catch((err) => console.log(err));
    },
    getAllProviders() {
      try {
        axios
          .get("http://localhost:3000/api/providers")
          .then((response) => {
            this.providers = response.data;            
          });
      } catch (error) {
        console.log(error);
      }
    },
    deleteProvider(id) {
      try {
        axios
          .delete("http://localhost:3000/api/providers/" + id)
          .then((response) => this.getAllProviders());
      } catch (error) {
        console.log(error);
      }
    },
    
  },
  watch: {
    editedClient(newValue) {
      this.client = Object.assign({}, newValue);
    }
  },
  created() {
    this.getAllProviders();
  },
  computed: {
    modalTitle() {
      return this.client._id === '' ? 'Create new' : 'Update client';
    },
    addButtonText() {
      return this.client._id === '' ? 'Add Client' : 'Save client';
    }
  }
};
</script>
<template>
  <b-modal id="modalClient" :title="modalTitle" :hide-footer="true">
      <div>
        <div class="mb-3">
          <label for="labelinput" class="form-label">Name</label>
          <input
            type="text"
            class="form-control"
            id="labelinpur"
            v-model="client.name"
          />
        </div>
        <div class="mb-3">
          <label for="labelInputMail" class="form-label">EMail</label>
          <input
            type="text"
            class="form-control"
            id="labelInputMail"
            v-model="client.email"
          />
        </div>
        <div class="mb-3">
          <label for="labelInputPhohne" class="form-label">Phone</label>
          <input
            type="text"
            class="form-control"
            id="labelInputPhone"
            v-model="client.phone"
          />
        </div>
        <div class="input-group">
          <label for="labelInputProvider">Providers</label>
          <input
            type="text"
            class="form-control mt-0 m-3"
            id="labelInputProvider"
            v-model="provider"
          />
          <div class="input-group-append">
            <button class="btn btn-primary" v-on:click="addProvider()">
              Add Provider
            </button>
          </div>
        </div>
        <div>
          <table class="table table-striped">
            <tbody>
              <tr v-for="provider in providers" :key="provider.id">
                <td>
                  <label class="form-checkbox">
                    <input
                      type="checkbox"
                      :checked="isClientProvider(provider)"
                      @change="selectProvider(provider)"
                    />
                    <i class="form-icon"></i>
                  </label>
                </td>
                <td>{{ provider.name }}</td>
                <td>
                  <router-link
                    :to="{
                      name: 'ProviderEdit',
                      params: { id: provider._id },
                    }"
                    class="btn btn-primary"
                    >Edit
                  </router-link>
                </td>
                <td>
                  <button
                    class="btn btn-danger"
                    @click.prevent="deleteProvider(provider._id)"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <button
          type="submit"
          class="btn btn-primary"
          @click="saveClient()"
        > 
        {{ addButtonText }}
        </button>
      </div>
    </b-modal>
  </template>