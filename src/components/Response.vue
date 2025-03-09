<template>
  <div>
    <h3>Response:</h3>
    <div v-if="errorMessage" class="error-message">
      <p>Error: {{ errorMessage }}</p>
    </div>
    <div v-else>
      <pre v-if="isJsonResponse">{{ formattedResponse }}</pre>
      <pre v-else>{{ rawResponse }}</pre>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    response: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      rawResponse: this.response,
      errorMessage: "",
      isJsonResponse: false,
      formattedResponse: "",
    };
  },
  watch: {
    response(newResponse) {
      this.rawResponse = newResponse;
      this.processResponse();
    },
  },
  mounted() {
    this.processResponse();
  },
  methods: {
    processResponse() {
      try {
        // Check if the response is JSON
        this.formattedResponse = JSON.stringify(JSON.parse(this.rawResponse), null, 2);
        this.isJsonResponse = true;
        this.errorMessage = ""; // Clear any previous error messages
      } catch (error) {
        // If not JSON, just display as raw text
        this.isJsonResponse = false;
        this.errorMessage = `Failed to parse response as JSON. Displaying raw content.`;
      }
    },
  },
};
</script>

<style scoped>
.error-message {
  color: red;
  font-weight: bold;
}
pre {
  background-color: #f5f5f5;
  padding: 10px;
  border-radius: 4px;
  font-family: monospace;
  white-space: pre-wrap;
  word-wrap: break-word;
}
</style>
