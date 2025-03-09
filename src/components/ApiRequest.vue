<template>
  <div>
    <h2>Make an API Request</h2>
    <div>
      <label for="url">URL:</label>
      <input type="text" id="url" v-model="localUrl" placeholder="Enter API URL" />
    </div>

    <div>
      <label for="method">Method:</label>
      <select v-model="localMethod" id="method">
        <option value="GET">GET</option>
        <option value="POST">POST</option>
        <option value="PUT">PUT</option>
        <option value="DELETE">DELETE</option>
        <option value="PATCH">PATCH</option>
      </select>
    </div>

    <div>
      <h3>Headers</h3>
      <table>
        <thead>
          <tr>
            <th>Key</th>
            <th>Value</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(header, index) in localHeaders" :key="index">
            <td><input v-model="header.key" @input="handleHeaderInput(index)" placeholder="Header Key" /></td>
            <td><input v-model="header.value" @input="handleHeaderInput(index)" placeholder="Header Value" /></td>
            <td>
              <button v-if="index !== localHeaders.length - 1" @click="removeHeader(index)">Remove</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div v-if="localMethod === 'POST' || localMethod === 'PUT' || localMethod === 'PATCH'">
      <label for="body">Request Body (JSON):</label>
      <textarea id="body" v-model="localBody" placeholder="Enter request body in JSON format" rows="4"></textarea>
    </div>

    <div>
      <button @click="sendRequest">Send Request</button>
    </div>

    <div v-if="loading" class="loading">Loading...</div>
  </div>
</template>

<script>
export default {
  props: {
    url: { type: String, default: '' },
    method: { type: String, default: 'GET' },
    body: { type: String, default: '' },
    headers: { type: Array, default: () => [] }
  },
  data() {
    return {
      localUrl: this.url,
      localMethod: this.method,
      localBody: this.body,
      loading: false,
      localHeaders: [...this.headers, { key: '', value: '' }] // Ensure at least one empty row
    };
  },
  methods: {
    handleHeaderInput(index) {
      const lastHeader = this.localHeaders[this.localHeaders.length - 1];
      if (lastHeader.key || lastHeader.value) {
        this.localHeaders.push({ key: '', value: '' });
      }
    },
    removeHeader(index) {
      this.localHeaders.splice(index, 1);
    },
    async sendRequest() {
      this.loading = true;
      let options = {
        method: this.localMethod,
        headers: {}
      };
      
      // Populate headers, excluding empty rows
      this.localHeaders.forEach(header => {
        if (header.key.trim() && header.value.trim()) {
          options.headers[header.key] = header.value;
        }
      });
      
      // If the method is POST, PUT, or PATCH, include the body
      if (['POST', 'PUT', 'PATCH'].includes(this.localMethod)) {
        try {
          JSON.parse(this.localBody); // Validate JSON format
          options.body = this.localBody;
          options.headers['Content-Type'] = 'application/json';
        } catch (error) {
          alert('Invalid JSON body');
          this.loading = false;
          return;
        }
      }
      
      try {
        const res = await fetch(this.localUrl, options);
        const data = await res.text();
        this.$emit('fetch-response', data); // Emit response to parent component
      } catch (error) {
        this.$emit('fetch-response', `Error: ${error.message}`);
      } finally {
        this.loading = false;
      }
    }
  },
  watch: {
    url(newVal) { this.localUrl = newVal; },
    method(newVal) { this.localMethod = newVal; },
    body(newVal) { this.localBody = newVal; },
    headers(newVal) { this.localHeaders = [...newVal, { key: '', value: '' }]; }
  }
};
</script>

<style scoped>
input,
select,
textarea {
  width: 100%;
  padding: 8px;
  margin: 8px 0;
  border-radius: 4px;
  border: 1px solid #777;
  background-color: #222;
  color: #ddd;
  box-sizing: border-box;
}

body {
  background-color: #121212;
  color: #ddd;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin: 10px 0;
  background-color: #222;
  color: #ddd;
  table-layout: fixed;
}

th, td {
  padding: 8px;
  border: 1px solid #555;
  text-align: left;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

button {
  padding: 10px 20px;
  background-color: black;
  color: white;
  border: 1px solid gray;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #222;
}

.loading {
  font-weight: bold;
  color: #bbb;
}
</style>
