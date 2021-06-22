<script>
import axios from "axios";
import VueAxios from "vue-axios";
import clientEdit from "./clientEdit.vue";

const SERVER_URL = 'http://localhost:3000/api';

export default {
  components: { clientEdit },
  name: "clients",
  data: () => ({
    clients: [],
    provider: '',
    editedClient: {
      _id: '',
      name: '',
      phone: '',
      providers: [],
    },
  }),

  methods: {
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
    openAddModal() {
      this.editedClient = {
        _id: '',
        name: '',
        phone: '',
        providers: [],
      };
      this.$bvModal.show("modalClient");
    },
    openEditModal(client) {
      this.editedClient = client;
      this.$bvModal.show("modalClient");
      
    },
  },
  created() {
    this.getAllClients();
  },
};
</script>

<template>
  <div>
    <nav class="navbar navbar-dark bg-dark">
      <span class="navbar-brand mb-0 h2">List of client</span>
      <div>
        <b-button
          class="btn btn-primary"
          data-toggle="modal"
          data-target="modalClient"
          @click="openAddModal"
          >New Client</b-button
        >
      </div>
    </nav>

    <div class="container">
      <table class="table table-striped">
        <thead>
          <tr>
            <td>Name</td>
            <td>Email</td>
            <td>Phone</td>
            <td>Providers</td>
          </tr>
        </thead>

        <tbody>
          <tr :key="client._id" v-for="client in clients">
            <td>{{ client.name }}</td>
            <td>{{ client.email }}</td>
            <td>{{ client.phone }}</td>
            <td>
              <span :key="provider.id" v-for="provider in client.providers"
                >{{ provider.name }} -/
              </span>
            </td>

            <td>
              <button class="btn btn-primary" @click="openEditModal(client)">
                Edit
              </button>
            </td>

            <td>
              <button
                class="btn btn-danger"
                v-on:click="deleteClient(client._id)"
              >
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <clientEdit :editedClient="editedClient" />
    </div>
  </div>
</template>
