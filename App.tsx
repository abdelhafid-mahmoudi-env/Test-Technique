import { useState } from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import { Questions } from './types';
import data from "./data.json";
import _ from "lodash";
import Question from './components/Question';
import { Button, Surface } from 'react-native-paper';
import { NativeBaseProvider } from "native-base";
import * as eva from '@eva-design/eva';
import {
	ApplicationProvider
} from '@ui-kitten/components';

const { width } = Dimensions.get('screen');

export default function App() {

	const [counting, setCounting] = useState(0);
	const [markers, setMarkers] = useState<number>(0);
	const [questionIndex, setQuizIndex] = useState<number>(0);
	const [questions] = useState<Questions>(
		_.cloneDeep(data)
	);

	const isEnd = questions.length === questionIndex;

	return (
		<NativeBaseProvider>
			<ApplicationProvider {...eva} theme={{ ...eva.light }}>
				<View style={{ flex: 1, }}>
					<View style={{
						flex: 1,
						backgroundColor: '#47B5FF',
						height: 200,
						borderBottomLeftRadius: 35,
						borderBottomRightRadius: 35
					}}>
						<View style={{ position: 'absolute', bottom: -20, right: 0, left: 0, marginHorizontal: 20 }}>
							<View style={{ marginBottom: 10 }}>
								<Text style={{ fontSize: 15, color: 'white', fontWeight: '700' }}>Hi, User name</Text>
								<Text style={{ fontSize: 12 }}>Lorem ipsum dolor sit amet</Text>
							</View>
							<View style={{ flex: 1, flexDirection: 'row', flexWrap: 'wrap', backgroundColor: 'white', elevation: 3, padding: 10, borderRadius: 10, display: !isEnd ? undefined : 'none' }}>
								<View style={{ flex: 1, alignItems: 'center' }}>
									<Text style={{ fontSize: 10, marginBottom: 5 }}>Question</Text>
									<Surface style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: 4, borderRadius: 5 }}>
										<Text style={{ color: '#2D72D2', fontWeight: '700', fontSize: 23 }}>{questionIndex} / {questions.length}</Text>
									</Surface>
								</View>
								<View style={{ flex: 1, alignItems: 'center' }}>
									<Text style={{ fontSize: 10, marginBottom: 5 }}>Temps écoulé</Text>
									<View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
										<Surface style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: 4, borderRadius: 5, margin: 3 }}>
											<Text style={{ color: '#2D72D2', fontWeight: '700', fontSize: 23 }}>{questions[questionIndex]?.time}</Text>
										</Surface>
										<Surface style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: 4, borderRadius: 5, margin: 3 }}>
											<Text style={{ color: '#F0B726', fontWeight: '700', fontSize: 23 }}>{counting}</Text>
										</Surface>
									</View>
								</View>
							</View>
						</View>
					</View>
					<View style={{ flex: 2, justifyContent: 'center', alignItems: 'center' }}>
						<View style={{ width: width - 30 }}>
							{isEnd ? (
								<View style={{ backgroundColor: 'white', padding: 10, borderRadius: 5, elevation: 2, justifyContent: 'center', alignItems: 'center' }}>
									<Text style={{ fontWeight: '700', fontSize: 15 }}>Félicitation</Text>
									<Text style={{ fontSize: 10 }}>Voici votre score</Text>
									<Text style={{ backgroundColor: '#91ACE5', color: '#0F6894', padding: 10, borderRadius: 5, marginTop: 10, fontWeight: '700', fontSize: 20 }}>{markers} / {questions.length}</Text>
									<Button buttonColor='#47B5FF' mode="contained" style={{ marginTop: 25 }} onPress={() => {
										setQuizIndex(0);
										setMarkers(0);
									}}>
										Refaire le test
									</Button>
								</View>
							) : (
								<Question
									setCounting={setCounting}
									currentIndex={questionIndex}
									total={questions.length}
									current={questions[questionIndex]}
									onNext={(isValid, index, answer) => {
										setQuizIndex(questionIndex + 1);
										if (isValid) {
											setMarkers(markers + 1);
										}
									}}
								/>
							)}
						</View>
					</View>
				</View>
			</ApplicationProvider>
		</NativeBaseProvider>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
});
