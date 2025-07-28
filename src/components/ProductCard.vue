
<template>
  <div class="border rounded p-4 shadow hover:shadow-md transition">
    <img :src="product.image" alt="" class="w-full h-48 object-cover mb-2 rounded" />
    <h2 class="font-bold text-lg">{{ product.name }}</h2>
    <p class="text-sm text-gray-600">{{ product.description }}</p>
    <p class="font-semibold text-brown-700">R$ {{ product.price.toFixed(2) }}</p>
  </div>
</template>

<script setup>
defineProps({ product: Object })
</script>
