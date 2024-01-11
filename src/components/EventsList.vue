<template>
    <div class="events hero is-medium has-background-primary-light">
        <div class="columns is-variable">
          <div class="hero-body column is-4">
            <p class="title">
              Beberapa fitur kami
            </p>
            <p class="subtitle">
              Untuk Anda yang ingin membutuhkan check up kesehatan online
            </p>
          </div>
          <div class="hero-body column">
            <div class="card">
              <div class="card-content">
                <div class="content">
                <p class="title is-4 has-text-link-dark">Check-up</p>
                <p class="subtitle is-6 has-text-info-dark">Konsultasikan hasil check-up anda</p>
              </div>
              </div>
              <div class="card-content">
                <div class="content has-text-grey-dark">
                  Fitur Check-up kesehatan, seperti pengecekan gula darah, kolesterol dan asam urat. Hanya perlu cek hasil gula darah anda maka akan dapat solusinya.
                </div>
              </div>
            </div>
          </div>
          <div class="hero-body column">
            <div class="card">
              <div class="card-content">
                <div class="content">
                <p class="title is-4 has-text-primary-dark">Pencarian Rumah Sakit</p>
                <p class="subtitle is-6 has-text-warning-dark">Pencarian Rumah Sakit untuk Medical Check-up</p>
              </div>
              </div>
              <div class="card-content">
                <div class="content has-text-grey-dark">
                  Mencari Rumah Sakit untuk medical check-up dengan mudah. Setelah mendapatkan konsultasi dari kami, akan kami sarankan untuk datang ke rumah sakit rekanan kami.
                </div>
              </div>
            </div>
          </div>
        </div>
    </div>
  </template>
  <script>
    export default {
      name: 'EventsList',
      data() {
        return {
          event: {},
          events: [
            {
              id: 1,
              name: 'Charity Ball',
              category: 'Fundraising',
              description:
                'Spend an elegant night of dinner and dancing with us as we raise money for our new rescue farm.',
              featuredImage: 'https://placekitten.com/500/500',
              images: [
                'https://placekitten.com/500/500',
                'https://placekitten.com/500/500',
                'https://placekitten.com/500/500',
              ],
              location: '1234 Fancy Ave',
              date: '12-25-2019',
              time: '11:30',
            },
            {
              id: 2,
              name: 'Rescue Center Goods Drive',
              category: 'Adoptions',
              description:
                'Come to our donation drive to help us replenish our stock of pet food, toys, bedding, etc. We will have live bands, games, food trucks, and much more.',
              featuredImage: 'https://placekitten.com/500/500',
              images: ['https://placekitten.com/500/500'],
              location: '1234 Dog Alley',
              date: '11-21-2019',
              time: '12:00',
            },
          ]
        }
      },
      created() {
        console.log(this.$route.params);
      },
      methods: {
        clickEvent() {
          this.emitter.emit('showMenuMobile', false)
        }
      }
    };
  </script>
  <style lang="scss" scoped>
    .events {
      // margin-top: 100px;
      // text-align: center;
      padding-top: 10px;
    }
    .card {
      background-color: #5cbdb9;
      box-shadow: inset;
      border-radius: 10px;
    }
    .card-image {
      background-color: white;
      border-radius: 10px;
    }
  </style>