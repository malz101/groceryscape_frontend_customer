<template>
    <div class="contact">
        <div class="contact-header">
            <h5>Contact</h5>
            <p>Home / Contact</p>
        </div>
        <div class="section">
            <div class="container">
                <div class="contact-row">
                    <div class="contact-info">
                        <h4>Get In Touch</h4>
                        <div class="contact-card-container">
                            <div class="card">
                                <div class="card-content">
                                    <span class="card-title"><i class="material-icons tiny">home</i></span>
                                    <h6>Address</h6>
                                    <p>1-3 West Road, P.O. Box 148, Kingston 7, Jamaica</p>
                                </div>
                            </div>
                            <div class="card">
                                <div class="card-content">
                                    <span class="card-title"><i class="material-icons tiny">call</i></span>
                                    <h6>Phone</h6>
                                    <p>+1 (876) 123-4567</p>
                                </div>
                            </div>
                            <div class="card">
                                <div class="card-content">
                                    <span class="card-title"><i class="material-icons tiny">email</i></span>
                                    <h6>Email</h6>
                                    <p><a href="mailto:groceryscape@gmail.com">groceryscape@gmail.com</a></p>
                                </div>
                            </div>
                            <div class="card">
                                <div class="card-content">
                                    <span class="card-title"><i class="material-icons tiny">link</i></span>
                                    <h6>Website</h6>
                                    <p><a href="https://www.groceryscape.web.app">www.groceryscape.com</a></p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="contact-location"></div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    
}
</script>

<style lang="scss" scoped>
.section{
    border-bottom: 1px solid #ddd;
}

.contact-header{
    text-align: center;
    background: #00242c;
    color: white;
    display: flex;
    width: 100%;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding-top: 32px;
    padding-bottom: 32px;

    h5{
        margin-top: 0;
        font-size: 32px;
    }
    p{
        font-size: 10px;
    }
}

h4{
    text-align: center;
}
.contact-card-container{
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    .card{
        box-sizing: border-box;
        width: 300px;
        box-shadow: none;
        text-align: center;

        .card-title i{
            font-size: 48px;
        }

        h6{
            font-weight: bold;
        }
    }
}

</style>