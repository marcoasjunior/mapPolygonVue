<template>
  <v-app>
    <v-app-bar app color="primary" dark class="title">
      Desafio DevOZ
    </v-app-bar>

    <v-main>

      <v-card max-width="600" class="mx-auto mt-5">

        <v-card-title>

          <p class="subtitle">Digite o endereço abaixo:</p>

        </v-card-title>

        <v-card-text>

          <v-form class="d-flex flex-column">

            <v-text-field v-model="address" label="Endereço" outlined required></v-text-field>

            <v-btn @click="getAreas" color="primary">Procurar</v-btn>

          </v-form>

        </v-card-text>

      </v-card>

      <v-card max-width="600" class="mx-auto mt-5">

        <v-card-title>

          <p class="body-1">Áreas em que o endereço informado está contido:</p>

        </v-card-title>

        <v-card-text>

          <p v-if="areas.length === 0 "> Sem dados</p>

          <v-list>

            <v-list-item-group color="primary">

              <v-list-item v-for="(area, i) in areas" :key="i">

                <v-list-item-icon>

                  <v-icon>mdi-map</v-icon>

                </v-list-item-icon>

                <v-list-item-content>

                  <v-list-item-title v-text="area"></v-list-item-title>

                </v-list-item-content>

              </v-list-item>

            </v-list-item-group>

          </v-list>

        </v-card-text>

      </v-card>

       <v-card max-width="600" class="mx-auto mt-5">

        <v-card-title>

          <p class="body-1">Mapa:</p>

          <GmapMap
          :center="center"
          :zoom="10"
          map-type-id="terrain"
          style="width: 500px; height: 300px"
        >
          <GmapMarker
            :key="index"
            v-for="(m, index) in markers"
            :position="m.position"
            :clickable="true"
            :draggable="true"
            @click="center=m.position"
          />
        </GmapMap>

        </v-card-title>

       </v-card>



    </v-main>

  </v-app>

</template>

<script>

export default {

  name: 'App',

  data: () => ({

    address: null,
    areas: [],
    center: {lat:-27.5800711, lng:-48.5827555},
    markers: [],

  }),

  methods: {
    
    async getAreas() {

      if (!this.address) return alert('Preencha o endereço.')

      const demand = await this.$axios.get(`http://localhost:3333/demand/${this.address}`).catch(() => alert('Erro ao procurar área, endereço não encontrado.'))

      this.center = {
        
        lat: demand.data.point[0].latitude,
        lng: demand.data.point[0].longitude,

        }

      this.markers.push({

        position: {
        
        lat: demand.data.point[0].latitude,
        lng: demand.data.point[0].longitude,

        }
      })

      this.areas = demand.data.areas

    }

  },
}

</script>

