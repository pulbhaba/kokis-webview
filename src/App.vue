<template>
  <div>
    <ApiRequest :url="requestData.url" :method="requestData.method" :headers="requestData.headers" :body="requestData.body" @fetch-response="updateResponse" />
    <Response :response="responseData" />
  </div>
</template>

<script>
import ApiRequest from './components/ApiRequest.vue';
import Response from './components/Response.vue';

export default {
  components: {
    ApiRequest,
    Response
  },
  data() {
    return {
      requestData: {
        url: '',
        method: 'GET',
        headers: [],
        body: '',
      },
      headersText: '',
      responseData: '',
    };
  },
  mounted() {
    if (window.apiRequest) {
      this.requestData = {
        url: window.apiRequest.url || '',
        method: window.apiRequest.method || 'GET',
        headers: window.apiRequest.headers || [],
        body: window.apiRequest.body || '',
      };

      this.headersText = this.requestData.headers.join('\n');
    }
  },
  methods: {
    updateResponse(response) {
      this.responseData = response;
    }
  }
};
</script>
