Vue.component('product',{
    props:{
        premium:{
            type:Boolean,
            required:true
        }
    },
    template: `<div class="product">

    <div class="product-image">
        <img v-bind:src="image">
    </div>

    <div class="produc-info">
            <h1>{{title}}</h1>
                <p v-if="inStock">Em estoque</p>
                <p v-else>Fora de Estoque</p>
                <p>Preco:{{shipping}}</p>
                <p>{{sale}}</p>

                <ul>
                    <li v-for="detail in details">{{detail}}</li>
                </ul>

                <div class="color-box" v-for="(variant, index) in variants" 
                    :key="variant.variantId"
                    class="color-box"
                    :style="{backgroundColor:variant.variantColor}"
                    @mouseover="updateProduct(index)"
                    >
                </div>
                
            <button v-on:click="addToCart" 
              :disabled="!inStock"
              :class="{ disabledButton: !inStock }"
              >
                Adicionar ao carrinho
            </button>
    </div>

            <div id="avaliacoes">
            <h2>Avaliacoes</h2>
            <p>Nao ha comentarios</p>
            <ul>
                <li v-for="review in reviews">{{review}}</li>
            </ul>
            </div>



            <product-review @review-subimitted="addReview"></product-review>

    </div>`,
    data(){
        return{
            product: 'Meia',
            brand: 'Produto: ',
            selectedVariant: 0,
            details: ["80% Algodao", "20%poliester", "Neutro de genero"],
            variants:[
                {
                    variantId:2234,
                    variantColor:"green",
                    variantImage:"https://d2mxuefqeaa7sj.cloudfront.net/s_ACF2B3FED5F7644A8E27E3FE8A9142BB95ECC3C792EA9166BF492FA2116B5277_1517608730821_Screen+Shot+2018-02-02+at+4.58.29+PM.png",
                    variantQuantity: 10
                },
                {
                    variantId: 2235,
                    variantColor:"blue",
                    variantImage:"https://www.vuemastery.com/images/challenges/vmSocks-blue-onWhite.jpg",
                    variantQuantity: 0
                }
            ],
            reviews:[],
            onSale:true
        }
    } ,
    methods:{
        addToCart: function() {
            this.$emit('add-to-cart', this.variants[this.selectedVariant].variantId) 
        },
        updateProduct:function(index){
            this.selectedVariant = index
        },
        addReview(productReview){
            this.reviews.push(productReview)
        }
    },
    computed:{
        title(){
            return this.brand + '' + this.product
        },
        image(){
            return this.variants[this.selectedVariant].variantImage
        },
        inStock(){
            return this.variants[this.selectedVariant].variantQuantity 
        },

        shipping(){
            if(this.premium){
                return "Free"
            }
            return 2.99
        },

        sale() {
          if (this.onSale) {
            return this.brand + ' ' + this.product + ' esta a venda'
          } 
            return  this.brand + ' ' + this.product + ' nao esta a venda'
        } 
    }
})


Vue.component('product-review',{
    template:`
    <form class="review-form" @submit.prevent="onSubmit">  
    <p>
        <label for="name">Deixe aqui sua avaliacao:</label><br/><br/><br/>
        <label for="name">Nome:</label>
        <input id="name" v-model="name">
      </p>
      
      <p>
        <label for="review">Comentario:</label>       
        <textarea id="review" v-model="review"></textarea>
      </p>
      
      <p>
        <label for="rating">Avaliacao:</label>
        <select id="rating" v-model.number="rating">
          <option>5</option>
          <option>4</option>
          <option>3</option>
          <option>2</option>
          <option>1</option>
        </select>
      </p>
          
      <p>
        <input type="submit" value="Submit">  
      </p>    
    
    </form>
    `,
    data(){
        return{
            name:null,
            review:null,
            rating:null
        }
    },
    methods:{
        onSubmit(){
            let productReview = {
                name:this.name,
                review:this.review,
                rating:this.rating
            }
            this.$emit('review-submitted', productReview)
            this.name = null
            this.review = null
            this.rating = null
        }
    }
})


var app = new Vue({
    el: '#app',
    data:{
        premium:false,
        cart:[]
    },
    methods:{
        updateCart(id){
            this.cart.push(id)
        }
    }
})