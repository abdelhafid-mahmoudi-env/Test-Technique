import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Answer, Question as IQuestion } from '../types'
import _ from 'lodash';
// import useTimeout from '../hooks/useTimeout';
import useInterval from '../hooks/useInterval';
import { Button } from 'react-native-paper';
import { CheckBox } from '@ui-kitten/components';

interface Props {
    setCounting: (value: number) => void;
    onNext: (isValid: boolean, questionIndex: number, answer: Answer | null, hasAnswer: boolean) => void;
    currentIndex: number;
    current: IQuestion;
    total: number;
}

const Question: React.FC<Props> = ({
    onNext,
    currentIndex,
    current,
    setCounting
}) => {

    const [count, setCount] = useState<number>(0);
    const [selectedAnswerIndex, setSelectedAnswerIndex] = useState<number | null>(null);

    useEffect(() => {
        setCount(0);
        setCounting(0);
        setSelectedAnswerIndex(null);
    }, [currentIndex]);

    useInterval(() => {
        if (current.time === count) {
            onNext(
                selectedAnswerIndex !== null
                    && current.answers[selectedAnswerIndex].correct === true,
                currentIndex,
                selectedAnswerIndex !== null
                    ? current.answers[selectedAnswerIndex] : null,
                selectedAnswerIndex !== null
            );
        } else {
            const mem = count + 1;
            setCount(mem);
            setCounting(mem);
        }
    }, 1000);

    // const useStyle = (isValid: boolean) => isValid === true
    //     ? styles.selectedAnswer
    //     : undefined;

    return (
        <View>
            <View style={{ marginBottom: 20 }}>
                <Text style={{ fontSize: 15, fontWeight: '700' }}>Question {current.id}</Text>
                <Text style={{ color: '#5F6B7C' }}>{current.label}</Text>
            </View>
            <View>
                {current.answers instanceof Array && current.answers.map((answser, index) => (
                    <CheckBox
                        style={{ marginBottom: 5 }}
                        status={selectedAnswerIndex === index ? 'success' : undefined}
                        checked={selectedAnswerIndex === index}
                        onChange={nextChecked => setSelectedAnswerIndex(nextChecked ? index : null)}>
                        {answser.label}
                    </CheckBox>
                    // <TouchableOpacity
                    //     key={index}
                    //     style={{ flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center' }}
                    //     onPress={() => setSelectedAnswerIndex(index)}>
                    //     <Checkbox
                    //         color='#62D96B'
                    //         status={selectedAnswerIndex === index ? 'checked' : 'unchecked'}
                    //         onPress={() => setSelectedAnswerIndex(index)}
                    //     />
                    //     <Text style={{ color: 'black' }}>{answser.label}</Text>
                    // </TouchableOpacity>
                ))}
                <Button style={{ marginTop: 30 }} buttonColor="#47B5FF" mode="contained" onPress={() => {
                    onNext(
                        selectedAnswerIndex !== null
                            && current.answers[selectedAnswerIndex].correct === true,
                        currentIndex,
                        selectedAnswerIndex !== null
                            ? current.answers[selectedAnswerIndex] : null,
                        selectedAnswerIndex !== null
                    );
                }}>Suivant</Button>
            </View>
        </View>
    );
}

export default Question;

const styles = StyleSheet.create({
    anwser: {
        backgroundColor: 'black',
    },
    selectedAnswer: {
        backgroundColor: 'green',
    }
})