addLayer("a", {
    name: "成就", 
    symbol: "A", 
    position: 0, 
    startData() { return {
        unlocked: true,
    }},
    color: "#ff0000",
    resource: "成就", 
    type: "none", 
    row: 'side', 
    layerShown(){return true},
    achievements: {
        11: {
            name: "打开物品栏",
            tooltip:"打开物品栏。",
            done(){return player.points.gte(0.5)},
        },
        12:{
            name:"获得木头",
            tooltip:"从树上砍下来一块木材",
            done(){return player.w.points.gte(0.5)},
        },
        13:{
            name:"制作工作台",
            tooltip:"使用4块木板制作一个工作台。",
            done(){
                if (hasUpgrade("w",11)) 
                return true
                else return false        
            },
        },
        14:{
            name:"采矿时间到！",
            tooltip:"使用木板和木棍制作镐。",
            done(){return player.w.gao.gte(1)},
        },
    }
})
addLayer("w", {
    name: "原木", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "w", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
        ban: new Decimal(0),
        gun: new Decimal(0),
        gao: new Decimal(0),
    }},
    color: "#6a522e",
    requires: new Decimal(4), // Can be a function that takes requirement increases into account
    resource: "原木", // Name of prestige currency
    baseResource: "时间", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 1, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "w", description: "w: 进行原木重置", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return true},
    content:["blank",
    ["display-text",
        function(){return "你有" + format(player.w.ban) + "块木板"},
        {"color":"#b9955f","font-size": "20px",}
    ],
    ],
    clickables: {
        11: {
            title:"合成木板",
            display(){return '消耗一块原木合成四块木板'},
            canClick(){if (player.w.points.gte(1)) return true
                else return false
            },
            onClick(){
                player.w.points = player.w.points.sub(1)
                player.w.ban = player.w.ban.add(4)
                return
            },
        },
        12: {
            title:"合成木棍",
            display(){return '消耗两块木板合成四根木棍'},
            canClick(){if (player.w.ban.gte(2)) return true
                else return false
            },
            onClick(){
                player.w.ban = player.w.ban.sub(1)
                player.w.gun = player.w.gun.add(4)
                return
            },
        },
        13: {
            title:"合成木镐",
            display(){return '消耗三块木板、两根木棍合成一把木镐'},
            canClick(){if (player.w.ban.gte(3)) return true
                else return false
            },
            onClick(){
                player.w.ban = player.w.ban.sub(3)
                player.w.gun = player.w.gun.sub(2)
                player.w.gao = player.w.gao.add(1)
                return
            },
        },
    },
    upgrades: {
        11: {
            fullDisplay(){
                return "合成工作台<br>用四块原木合成工作台<br>需要:4木板"
            },
            onPurchase(){
                player.w.ban =plater.w.ban.sub(4)
            },
            canAfford(){
                return player.w.ban.gte(4)
            },
            unlocked(){return true},
        },
    },
})
addLayer("s", {
    name: "原石",
    symbol: "s",
    position: 1, 
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#7a7a7a",
    requires: new Decimal(4), 
    resource: "原石", 
    baseResource: "木板", 
    baseAmount() {return player.points}, 
    type: "none", 
    exponent: 1, 
    row: 1,
    layerShown(){
        if (hasUpgrade("w",11))
        return true
        else return false
    },
    upgrades: {
        11: {
            title:"合成熔炉",
            description:"用九块原石合成熔炉",
            cost: new Decimal(9)
        }
    },

})