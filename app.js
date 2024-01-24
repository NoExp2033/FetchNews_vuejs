new Vue({
    el: '#app',
    data: {
      newsList: [],
      loading: true,
      error: null,
    },
    mounted() {
      this.fetchNews();
    },
    methods: {
      async fetchNews() {
        try {
          const apiKey = '99249dd32aa8425798d1e2171efc5603';
          const apiUrl = `https://gnews.io/api/v4/top-headlines?country=us&token=${apiKey}`;
  
          const response = await axios.get(apiUrl);
  
          if (response.status !== 200) {
            throw new Error(`Failed to fetch news. Status: ${response.status}`);
          }
  
          if (!response.data.articles) {
            throw new Error('Invalid response format');
          }
  
          this.newsList = response.data.articles;
        } catch (error) {
          console.error('Error fetching news:', error.message);
          this.error = error.message;
        } finally {
          this.loading = false;
        }
      },
    },
    template: `
      <div>
        <h1 class="text-center my-4 news-title">My News API in VUE js Page</h1>
        <div v-if="loading" class="text-center">Loading...</div>
        <div v-else-if="error" class="text-center text-danger">{{ error }}</div>
        <ul v-else class="news-list">
          <li v-for="article in newsList" :key="article.title" class="news-item">
            <h5 class="font-weight-bold">{{ article.title }}</h5>
            <img v-if="article.image" :src="article.image" alt="News Image" class="news-image">
            <p>{{ article.description }}</p>
            <a :href="article.url" target="_blank" class="read-more">Read more</a>
          </li>
        </ul>
      </div>
    `,
  });
  