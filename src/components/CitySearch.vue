<!-- Home page -->

<template>
  <div>
    <h2>City Search</h2>
    <form v-on:submit.prevent="getCities">
        <p>Enter city name: <input type="text" v-model="query" placeholder="Paris, TX"> <button type="submit">Go</button></p>
    </form>
    <ul class="cities" v-if="results && results.list.length > 0">
        <li v-for="city in results.list">
            <h2>{{ city.name }}, {{ city.sys.country }}</h2>
            <p><router-link v-bind:to="{ name: 'CurrentWeather', params: { cityId: city.id } }">View Current Weather</router-link></p>
            <!-- WeatherSummary child component - icons and labels -->
            <weather-summary v-bind:weatherData="city.weather"></weather-summary>
            <!-- WeatherConditions child component - temps and humidity def list -->
            <weather-conditions v-bind:weatherData="city.main"></weather-conditions>
        </li>
    </ul>
    <!-- Error list child component -->
    <error-list v-bind:errorList="errors"></error-list>
  </div>
</template>

<script>
import {API} from '@/common/API';
import WeatherSummary from '@/components/WeatherSummary';
import WeatherConditions from '@/components/WeatherConditions';
import ErrorList from '@/components/ErrorList';

export default {
  name: 'CitySearch',
  data () {
    return {
      results: null,
      errors: [],
      query: ''
    }
  },
  methods: {
    getCities: function () {
      // API.js BaseURL abstraction
      API.get('find', {
        params: {
          q: this.query
        }
      })
      .then(response => {
        this.results = response.data
      })
      .catch(error => {
        this.errors.push(error)
      });
    }
  },
  components: {
    'weather-summary': WeatherSummary,
    'weather-conditions': WeatherConditions,
    'error-list': ErrorList
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/* global styles in App.vue */
li {
  margin: 5px;
}
</style>