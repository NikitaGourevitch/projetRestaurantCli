<template>
<div> je suis {{ state.edit }}</div>
  
</template>

<script>

import restaurants from '../class/Restaurants.js'
export default {
    data() {
        return{
            state: restaurants.state
        }
    }
}
</script>

