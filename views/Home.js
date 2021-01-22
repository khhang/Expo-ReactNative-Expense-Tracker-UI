import React, {useState} from 'react';
import { View, Button, StyleSheet, ActivityIndicator } from 'react-native';
import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';
import * as DocumentPicker from 'expo-document-picker';
import * as Permissions from 'expo-permissions';
import * as Papa from 'papaparse';
import {csvService} from '../services/csv-service';
import {expensesService} from './../services/expenses-service';

const Home = () => {

  const [loading, setLoading] = useState(false);

  return (
    <View style={styles.screenContainer}>
      <Button
        disabled={loading}
        title="Import CSV"
        onPress={async () => {
          const file = await DocumentPicker.getDocumentAsync();

          if(file.type === 'cancel'){
            return;
          }

          setLoading(true);
          
          try{
            const csvString = await FileSystem.readAsStringAsync(file.uri);
            const results = Papa.parse(csvString, { header: true });
            
            await csvService.importCsvData(results.data, false);
          } catch{
            setLoading(false);
          }

          setLoading(false);
        }}
      ></Button>
      <View style={{marginTop: 25}}>
        <Button
          disabled={loading}
          title="Import CSV App Format"
          onPress={async () => {
            const file = await DocumentPicker.getDocumentAsync();

            if(file.type === 'cancel'){
              return;
            }

            setLoading(true);

            try{
              const csvString = await FileSystem.readAsStringAsync(file.uri);
              const results = Papa.parse(csvString, { header: true });
  
              await csvService.importCsvData(results.data, true);
            } catch {
              setLoading(false);
            }

            setLoading(false);
          }}
        ></Button>
      </View>
      <View style={{marginTop: 25}}>
        <Button
          disabled={loading}
          title="Export CSV"
          onPress={async() => {
            const { status } = await Permissions.askAsync(Permissions.MEDIA_LIBRARY);
            if(status === 'granted'){
              setLoading(true);
              try{
                const csvData = Papa.unparse(await expensesService.getExpenseDetails());
                const fileUri = FileSystem.documentDirectory + 'expense_budget_data.csv';
                await FileSystem.writeAsStringAsync(fileUri, csvData, { encoding: FileSystem.EncodingType.UTF8});
                const asset = await MediaLibrary.createAssetAsync(fileUri);
                await MediaLibrary.createAlbumAsync('Download', asset, false);
              }catch{
                setLoading(false);
              }
            }

            setLoading(false);
          }}
        ></Button>
        {loading && 
          (<ActivityIndicator size="large" color="#2196F3"/>)
        }
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    padding: 20
  }
})

export default Home;