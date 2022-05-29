var numbers = document.querySelectorAll('.number')
var operators = document.querySelectorAll(".operator")
var equals = document.querySelector('.equals')
var reset = document.querySelector('.reset')
var percentage = document.querySelector('.percentage')
var result = document.querySelector('.display')
var sign = document.querySelector('.sign')



class Calculator  {
    
    constructor() {
        
        this.activeOperand = "0"
        this.previousOperand = null
        this.operator = null
        this.flag1 = false
        this.flag2 = false
        this.negative = false
    }

    display() {
        if(this.activeOperand==="0."){
            result.innerText=this.activeOperand
        }
        else if(this.activeOperand.toString().length>10) {
            result.innerText = Number.parseFloat(this.activeOperand).toExponential(5)
        }
        else{result.innerText = this.formatNumber(this.activeOperand)}
        
        


    }

    formatNumber(number) {
        let dollarUSLocale = Intl.NumberFormat('en-US');
        return dollarUSLocale.format(number)
    }

    sign() {
        if (this.activeOperand === "0") return
        if (!this.negative) {
            this.activeOperand = "-" + this.activeOperand
        }
        else {
            this.activeOperand = this.activeOperand.substring(1)
        }
        this.negative = !this.negative
    }

    equals() {
        this.flag1 = true
        if(this.activeOperand && this.previousOperand && this.operator) {
            machine.compute()
            machine.display()
        }
    }

    getNumber(number) {
        if(!this.operator && this.start) {
            this.activeOperand = number
            this.flag2 = false
            
            return
        }
        if(!this.flag1) {
            if((number === '.' && this.activeOperand.includes('.')) || (this.activeOperand.toString().length===9)) return
            if(number==="." && this.activeOperand==="0"){
                this.activeOperand="0."
                return
            }
            this.activeOperand = this.activeOperand === "0" ? number : this.activeOperand += number
            
            return
        }
        this.previousOperand = this.activeOperand
        this.activeOperand = number
        this.flag1 = false

        
        

    }
    chooseOperation(operator) {
        if(this.previousOperand || this.previousOperand === 0) {
            this.compute()
            this.operator = operator
            this.flag1 = true
            return
        }
        this.operator = operator
        this.flag1 = true
        


    }
    reset() {
        this.activeOperand= "0"
        this.previousOperand = null
        this.operator= null
        this.flag1 = false
        this.flag2 = false
    }
    compute() {
      let computation 
      let prev = parseFloat(this.previousOperand)  
      let curr = parseFloat(this.activeOperand)
      if (isNaN(prev) || isNaN(curr)) return
      if(this.operator === "+") {
        computation = prev + curr
      }
      else if(this.operator === "−") {
        computation = prev - curr
      }
      else if(this.operator === "×") {
        computation = prev * curr
      }
      else if(this.operator === "÷") {
        computation = prev / curr
      }
      else {return}
      this.activeOperand = computation
      this.operator = null
      this.previousOperand = null

    }
    
    
    computePercentage() {
        this.activeOperand = this.activeOperand / 100
    }
}

const machine = new Calculator()

numbers.forEach(button => {
    button.addEventListener('click' ,() => {
       let number = button.innerText
       machine.getNumber(number)
       machine.display()
    })

})

reset.addEventListener('click', ()=> {
    
    machine.reset()
    machine.display()
})
operators.forEach(button => {
    button.addEventListener('click' ,() => {
       let operator = button.innerText
       
       machine.chooseOperation(operator)
       machine.display()
    })

})

equals.addEventListener('click', ()=> {
    machine.equals()
})
sign.addEventListener('click', ()=> {
    machine.sign()
    machine.display()
})

percentage.addEventListener('click', ()=> {
    machine.computePercentage()
    machine.display()
   
})