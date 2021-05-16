<template>
    <div class="about-us">
        <div class="about-us-header">
            <h5>About Us</h5>
            <p>Home / About Us</p>
        </div>
        <div class="section about-us-section">
            <div class="container">
                <div class="about-us-row">
                    <div class="image-col">
                        <img src="../assets/deliveryman.jpg" alt="Supermarket Image">
                    </div>
                    <div class="text-col">
                        <h5>
                            Save more with GO! We give you the lowest prices on all your grocery needs.
                        </h5>
                        <h6>Our Vision</h6>
                        <p>
                            It is a long established fact that a reader will be distracted by the readable
                            content of a page when looking at its layout. The point of using Lorem Ipsum 
                            is that it has a more-or-less normal distribution of letters, as opposed to using 
                            'Content here,
                        </p>
                        <h6>Our Goal</h6>
                        <p>
                            When looking at its layout. The point of using Lorem Ipsum is that it has a 
                            more-or-less normal distribution of letters, as opposed to using 'Content here, Lorem Ipsum has 
                            been the industry's standard dummy text ever since.
                        </p>
                    </div>
                </div>
            </div>
        </div>

        <div class="section quality-section">
            <div class="title">
                <h4><b>What We Provide</b></h4>
                <p>Something ephemoral is gonna go header</p>
            </div>
            <div class="quality-row">
                <div class="card">
                    <div class="card-content">
                        <div class="card-row">
                            <span class="icon-span"><i class="material-icons">local_shipping</i></span>
                            <div class="card-data">
                                <span class="card-title"> Free & Next Day Delivery</span>
                                <p>Islandwide free shipping</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="card">
                    <div class="card-content">
                        <div class="card-row">
                            <span class="icon-span"><i class="material-icons">local_mall</i></span>
                            <div class="card-data">
                                <span class="card-title">100% Satisfaction Guaranteed</span>
                                <p>Best quality Produce</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="card">
                    <div class="card-content">
                        <div class="card-row">
                            <span class="icon-span"><i class="material-icons">local_offer</i></span>
                            <div class="card-data">
                                <span class="card-title">Great Daily Deals Discount</span>
                                <p>Affordable produce</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="section team-section">
            <div class="title">
                <h4><b>Our Team</b></h4>
                <p>Something ephemoral is gonna go header</p>
            </div>
            <div class="team-row">
                <div class="card">
                    <div class="card-image">
                        <img src="../assets/programmer.png">
                    </div>
                    <div class="card-content">
                        <p>I am a very simple card. I am good at containing small bits of information.
                        I am convenient because I require little markup to use effectively.</p>
                        <h6>- Malik Edwards</h6>
                        <p>Database Developer</p>
                    </div>
                </div>
                <div class="card">
                    <div class="card-image">
                        <img src="../assets/programmer.png">
                    </div>
                    <div class="card-content">
                        <p>I am a very simple card. I am good at containing small bits of information.
                        I am convenient because I require little markup to use effectively.</p>
                        <h6>- Milton Francis</h6>
                        <p>Backend Developer</p>
                    </div>
                </div>
                <div class="card">
                    <div class="card-image">
                        <img src="../assets/programmer.png">
                    </div>
                    <div class="card-content">
                        <p>I am a very simple card. I am good at containing small bits of information.
                        I am convenient because I require little markup to use effectively.</p>
                        <h6>- Jason Hunter</h6>
                        <p>AI Developer</p>
                    </div>
                </div>
                <div class="card">
                    <div class="card-image">
                        <img src="../assets/programmer.png">
                    </div>
                    <div class="card-content">
                        <p>I am a very simple card. I am good at containing small bits of information.
                        I am convenient because I require little markup to use effectively.</p>
                        <h6>- Javier Bryan</h6>
                        <p>Frontend Developer </p>
                    </div>
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

.about-us-header{
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

.title{
    text-align: center;
}

.about-us-row{
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
    gap: 10px;

    .image-col{
        display: flex;
        border-radius: 10px;
        background: #fff;
        box-shadow: 1px 1px 8px 3px #eee, -1px -1px 8px 3px #eee;
        img{
            max-width: 100%;
            object-fit: contain;
        }
    }
    .text-col{
        padding: 0px 24px;

        h5{
            font-weight: bold;
            color: green;
            margin-bottom: 32px;
        }

        h6{
            font-weight: bold;
        }
        p{
            margin-bottom: 32px;
        }
    }
}

.quality-section{
    background: #00242c;
    color: white;
    .quality-row{
        display: flex;
        justify-content: space-evenly;
        flex-wrap: wrap ;

        .card-container{
            width: 70%;
        }

        .card{
            background: #00242c;
            color: white;
            box-shadow: none;
            .card-row{
                display: flex;
                flex-wrap: wrap;
                align-items: center;
                
                .icon-span{
                    border: 1px solid rgb(10, 71, 71);;
                    border-radius: 50%;
                    margin-right: 8px;
                }
                i{
                    font-size: 32px;
                    padding: 16px;
                }
            }
            .card-data{
                display: inline;
                .card-title{
                    font-size: 16px;
                }
                p{
                    font-size: 12px;
                }
            }
        }
    }
}

.team-section{
    background: var(--color-accent);
}

.team-row{
    display: flex;
    flex-wrap: wrap;
    justify-content: center;

    .card{
        background: var(--color-accent);
        box-shadow: none;
        width: 250px;
        padding: 12px;
        box-sizing: content-box;
        text-align: center;
        .card-image{
            display: flex;
            justify-content: center;
            img{
                border-radius: 50%;
                width: 120px;
                height: 120px;
            }
        }
    }
}

</style>