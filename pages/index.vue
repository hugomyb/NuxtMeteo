<script setup lang="ts">
const config = useRuntimeConfig()
const cities = ['Paris', 'Marseille', 'Montpellier', 'Lyon', 'Bordeaux']
const mainWeathers = ref([])

const fetchWeatherForCity = async (city) => {
  const apiKey = config.public.openWeatherMapApiKey
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
  return await $fetch(url)
}

const fetchWeatherData = async () => {
  const weatherData = await Promise.all(
    cities.map(async (city) => {
      const {data} = await useAsyncData(city, () => fetchWeatherForCity(city))

      let icon = 'i-heroicons-sun'
      let image = 'https://c0.wallpaperflare.com/preview/567/955/718/nature-sun-sky-outdoors.jpg'
      switch (data.value?.weather[0]?.main) {
        case 'Clear':
          icon = 'i-heroicons-sun'
          image = 'https://c0.wallpaperflare.com/preview/567/955/718/nature-sun-sky-outdoors.jpg'
          break
        case 'Clouds':
          icon = 'i-heroicons-cloud'
          image = 'https://media.istockphoto.com/id/1156241578/photo/dark-sky-with-storm-clouds.jpg?b=1&s=612x612&w=0&k=20&c=NBTYGju280VWGlwgfSaXXcXCv9Xe_CX6mnDql9ND_IA='
          break
        case 'Rain':
          icon = 'i-heroicons-rain'
          image = 'https://s7d2.scene7.com/is/image/TWCNews/ca_la_rain_gettyimages-528443237jpg'
          break
        case 'Snow':
          icon = 'i-heroicons-snow'
          image = 'https://img.freepik.com/premium-photo/winter-snow-falling-floor_87555-1628.jpg'
          break
        default:
          icon = 'i-heroicons-sun'
          image = 'https://c0.wallpaperflare.com/preview/567/955/718/nature-sun-sky-outdoors.jpg'
      }

      return {
        city,
        temp: Math.round(data.value?.main?.temp),
        icon,
        image
      }
    })
  )

  mainWeathers.value = weatherData
}

const carouselRef = ref()

onMounted(async () => {
  await fetchWeatherData()

  setInterval(() => {
    if (!carouselRef.value) return

    if (carouselRef.value.page === carouselRef.value.pages) {
      return carouselRef.value.select(0)
    }

    carouselRef.value.next()
  }, 4000)
})
</script>

<template>
  <div>
    <UCarousel ref="carouselRef"
               v-slot="{ item }"
               :items="mainWeathers"
               :ui="{ item: 'basis-full' }"
               class="overflow-hidden h-2/5"
               indicators
    >
      <ULandingHero class="w-full bg-hero" :style="{ backgroundImage: `url(${item.image})`}">
        <template #title>
          <span v-text="item.city"/>
        </template>

        <template #description>
          <UBadge variant="subtle" size="sm">
            <UIcon name="i-heroicons-sun" class="w-8 h-8 mr-2"/>
            <span class="text-lg">{{ item.temp }}°C</span>
          </UBadge>
        </template>
      </ULandingHero>
    </UCarousel>

    <!--    <ULandingHero :title="page.hero.title" :description="page.hero.description" :links="page.hero.links">-->
    <!--      <Placeholder/>-->

    <!--      <ULandingLogos :title="page.logos.title" align="center">-->
    <!--        <UIcon v-for="icon in page.logos.icons" :key="icon" :name="icon"-->
    <!--               class="w-12 h-12 lg:w-16 lg:h-16 flex-shrink-0 text-gray-900 dark:text-white"-->
    <!--        />-->
    <!--      </ULandingLogos>-->
    <!--    </ULandingHero>-->

    <!--    <ULandingSection :title="page.features.title" :description="page.features.description"-->
    <!--                     :headline="page.features.headline"-->
    <!--    >-->
    <!--      <UPageGrid id="features" class="scroll-mt-[calc(var(&#45;&#45;header-height)+140px+128px+96px)]">-->
    <!--        <ULandingCard v-for="(item, index) in page.features.items" :key="index" v-bind="item"/>-->
    <!--      </UPageGrid>-->
    <!--    </ULandingSection>-->

    <!--    <ULandingSection :title="page.pricing.title" :description="page.pricing.description"-->
    <!--                     :headline="page.pricing.headline"-->
    <!--    >-->
    <!--      <UPricingGrid id="pricing" compact class="scroll-mt-[calc(var(&#45;&#45;header-height)+140px+128px+96px)]">-->
    <!--        <UPricingCard v-for="(plan, index) in page.pricing.plans" :key="index" v-bind="plan"/>-->
    <!--      </UPricingGrid>-->
    <!--    </ULandingSection>-->

    <!--    <ULandingSection :headline="page.testimonials.headline" :title="page.testimonials.title"-->
    <!--                     :description="page.testimonials.description"-->
    <!--    >-->
    <!--      <UPageColumns id="testimonials" class="xl:columns-4 scroll-mt-[calc(var(&#45;&#45;header-height)+140px+128px+96px)]">-->
    <!--        <div v-for="(testimonial, index) in page.testimonials.items" :key="index" class="break-inside-avoid">-->
    <!--          <ULandingTestimonial v-bind="testimonial"/>-->
    <!--        </div>-->
    <!--      </UPageColumns>-->
    <!--    </ULandingSection>-->

    <!--    <ULandingSection class="bg-primary-50 dark:bg-primary-400 dark:bg-opacity-10">-->
    <!--      <ULandingCTA v-bind="page.cta" :card="false"/>-->
    <!--    </ULandingSection>-->

    <!--    <ULandingSection id="faq" :title="page.faq.title" :description="page.faq.description"-->
    <!--                     class="scroll-mt-[var(&#45;&#45;header-height)]"-->
    <!--    >-->
    <!--      <ULandingFAQ-->
    <!--        multiple-->
    <!--        :items="page.faq.items"-->
    <!--        :ui="{-->
    <!--          button: {-->
    <!--            label: 'font-semibold',-->
    <!--            trailingIcon: {-->
    <!--              base: 'w-6 h-6'-->
    <!--            }-->
    <!--          }-->
    <!--        }"-->
    <!--        class="max-w-4xl mx-auto"-->
    <!--      />-->
    <!--    </ULandingSection>-->
  </div>
</template>

<style>
.bg-hero {
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}
</style>
