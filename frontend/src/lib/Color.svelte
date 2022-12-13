<script>
    export let color = "black";
    function contrastingColor(hex) {
        var r = parseInt(hex.slice(1, 3), 16),
            g = parseInt(hex.slice(3, 5), 16),
            b = parseInt(hex.slice(5, 7), 16);
    
        if ((r+g+b) > (128 * 3)) {
            return "black"
        } else { return  "white"}
    }  

    let contrasting = "white";
    if (color.startsWith("#")) {
        contrasting = contrastingColor(color);
    }
</script>

<span class="color" style:background-color={color} style:color={contrasting} style:border="2px solid {contrasting}">{color}</span>

<style>
span {
        display: inline-block;
        width: 4em;
        padding: 0.2em;
        margin: 0.25em;
    }
</style>