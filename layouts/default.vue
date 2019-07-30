<template>
  <div>
    <Header/>
    <nuxt/>
    <Footer/>
  </div>
</template>
<script>
import Header from "@/components/header"
import Footer from "@/components/footer"

export default {
  components: {
    Header,
    Footer
  }
}
</script>
<style lang="less">
  *{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  ul li ol {
    list-style: none
  }
  a{
    text-decoration: none;
    color: inherit
  }
  em,i {
    font-style: normal
  }
</style>

