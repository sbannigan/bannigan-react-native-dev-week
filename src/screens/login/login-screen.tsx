import React from 'react';
import { useController, useForm } from 'react-hook-form';
import { View, Text, Button, TextInput } from 'react-native';
import { useAuth } from '../../context';
import * as api from '../../services';

const Input = ({ name, control, ...props }: any) => {
    const { field } = useController({
        control,
        defaultValue: '',
        name
    });
    return (
        <TextInput
            {...props}
            style={{
                borderColor: 'black',
                borderWidth: 1,
                borderRadius: 4,
                marginBottom: 10,
                height: 40
            }}
            autoCapitalize='none'
            value={field.value}
            onChangeText={field.onChange}/>
    )
}

export const LoginScreen = () => {
    const { signIn } = useAuth();

    const { control, handleSubmit } = useForm();

    async function onSubmit(form: any) {
        let response = await api.login(form);
        if (response?.access_token) {
            signIn(response.access_token);
        }
    }

    return (
        <View style={{
            padding: 20
        }}>
            <Text>Email</Text>
            <Input name='username' control={control} keyboardType='email-address' />

            <Text>Password</Text>
            <Input name='password'
                control={control}
                textContentType='password'
                secureTextEntry={true}/>
            
            <Button
                title="Login"
                onPress={handleSubmit(onSubmit)}/>

        </View>
    );

}
