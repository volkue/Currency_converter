document.addEventListener("DOMContentLoaded", () => {

    fetch(
        `http://api.exchangeratesapi.io/v1/latest?access_key=${KEY_API_CURRENCY}`
    )
        .then(response => response.json())
        .then(data => {
            console.log(data.rates);
            // document.querySelector("#x").setAttribute("value", "USD")
            // document.querySelector("#y").setAttribute("value", "EUR")



            document.addEventListener("change", (e) => {
                let money = []
                if (document.querySelector("#allCur").checked) {

                    for (let prop in data.rates) {
                        money.push(prop)
                    }
                    toClear()
                    AddListCurrency(money)
                } else {
                    money = ["USD", "EUR", "UAH"]
                    toClear()
                    AddListCurrency(money)
                }
                caluclation()
                console.log(money)
                e.preventDefault();

            })

            function AddListCurrency(money) {

                money.forEach((cur) => {

                    let option = document.createElement("option")
                    document.querySelector("#fromCurrency").appendChild(option);
                    option.value = cur;

                })

                money.forEach((cur) => {
                    let option = document.createElement("option")
                    document.querySelector("#toCurrency").appendChild(option);
                    option.value = cur;
                })
            }
            function caluclation() {
                const firstNumber = document.querySelector("#x").value

                const secondNumber = document.querySelector("#y").value
                const rateOne = data.rates[firstNumber]

                const rateTwo = data.rates[secondNumber]

                const inputMoney = document.querySelector("#inputMoney").value;

                const result = (rateTwo / rateOne) * inputMoney

                document.querySelector("#resultMoney").value = result.toFixed(3)
                if (document.querySelector("#resultMoney").value != "") {
                    document.querySelector(".display-cur__number").innerHTML = result.toFixed(3)
                    document.querySelector(".display-text").innerHTML = `${inputMoney} ${firstNumber} equils:`;
                    document.querySelector(".display-cur__currency").innerHTML = secondNumber;
                }


            }

            function toClear() {
                document.querySelectorAll("option").forEach(x => x.remove())
            }
            //in proress.. 
            document.querySelectorAll('[type="radio"]').forEach((radio) => {
                radio.addEventListener("change", () => {
                    document.querySelector("#resultMoney").value = "0";
                    document.querySelector("#x").value = ""
                    document.querySelector("#y").value = ""
                })
            })


            //  

        })
        .catch(error => {
            console.log("Error:", error);
        });
    const newDate = new Date().toString();
    const date = newDate.substring(0, 31)
    document.querySelector(".display-date").innerHTML = date;
    document.querySelector(".btn-clear").addEventListener("click", () => {
        document.querySelector("#resultMoney").value = "0";
        document.querySelector("#inputMoney").value = "100";
        document.querySelector("#x").value = ""
        document.querySelector("#y").value = ""
        document.querySelector(".display-cur__number").innerHTML = ""
        document.querySelector(".display-text").innerHTML = "";
        document.querySelector(".display-cur__currency").innerHTML = "";
    })



    return false;

});
