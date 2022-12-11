<script>
    let paletteName = "";
    </script>

    <section>

        <div>
            <div>Search palettes</div>
            <input type="text" bind:value={paletteName}>
            <input type="range" list="bitness">

            <datalist id="bitness">
                <option value="2"></option>
                <option value="3"></option>
                <option value="4"></option>
                <option value="5"></option>
                <option value="6"></option>
                <option value="7"></option>
                <option value="8"></option>
                <option value="9"></option>
                <option value="10"></option>
                <option value="11"></option>
                <option value="12"></option>
                <option value="13"></option>
                <option value="14"></option>
                <option value="15"></option>
                <option value="16"></option>
                <option value="20"></option>
                <option value="24"></option>
                <option value="28"></option>
                <option value="32"></option>
                <option value="36"></option>
                <option value="40"></option>
                <option value="44"></option>
                <option value="48"></option>
                <option value="52"></option>
                <option value="56"></option>
                <option value="60"></option>
                <option value="64"></option>
                <option value="more"></option>
            </datalist>
        </div>
    </section>