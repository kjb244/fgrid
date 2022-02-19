# fgrid
<br><br>
## Project setup (VueJS)
1. Clone repo
2. cd into directory
3. npm install
4. npm run serve --> runs it locally
5. Hit this in your browser: [http://localhost:8081/#/splash](http://localhost:8081/#/splash)

<br><br>

## ComboBox Component

### About
Creates a combobox - an input text and a drop down in one. Clicking in the box will expand all elements - allowing the user to select one. If the user types in the field it will filter the results (which then can be selected).

### Usage
Import in your script
```    
import ComboBox from "../components/ComboBox.vue";
```

Add it to component
```
components: {
    ComboBox
}
```

Add it to template
```
<combo-box v-model="foo"></combo-box>
```


### Considerations
<ul>
    <li>Dropdown of fruits is populated via ajax call in component; possibly we can pass in a prop to handle this in future</li>
    <li>We only emit input fruit name if the fruit is selected, else it will pass "" to parent</li>
    <li>Keyboard up/down arrows keys and enter work to traverse list and select</li>
    <li>ONLY tested in chrome and edge on desktop computer</li>
</ul>