import React, {useState} from "react";
import { View, Text, Button} from "react-native";
import customStyle from "../styles/custom";

interface FunctionalcomponentProps{
    buttonTitle: string;
    showButton: boolean;
}

const FunctionalComponent = (props : FunctionalcomponentProps)=> {
    const[count, setCount] = useState(0);

    return(
        <View style = {customStyle.container}>
            <Text>Functional Component</Text>
            <Text>{count}</Text>
            <Button title = "Button1" onPress={()=> setCount(count+1)}></Button>
        </View>
    );
}

export default FunctionalComponent;


export const FunctionalComponent2 = (props : FunctionalcomponentProps)=> {
    const[count, setCount] = useState(0);

    return(
        <View>
            <Text>Functional Component</Text>
            <Text>{count}</Text>
            <Button title = "Button2" onPress={()=> setCount(count+1)}></Button>
        </View>
    );
}

