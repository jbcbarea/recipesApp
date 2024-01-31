// generate-pdf.service.ts
import { Injectable } from '@angular/core';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';

interface IngredientesPDF {
  nombre:string,
  cantidad:number,
  unidad:string
}

interface RecipeDetails {
  recipeName: string;
  tipoCocina:string;
  comensales: number;
  tiempoPreparacion: string;
  dificultad: string;
  fechaCreacion: string;
  creadoPor: string;
  puntuacion: number;
  votaciones: number;
  ingredientes: IngredientesPDF[];
  preparacion: string[];
  caloriasTotales: number;
}

@Injectable({
  providedIn: 'root',
})

export class GeneratePdfService {
  constructor() {
    (pdfMake as any).vfs = pdfFonts.pdfMake.vfs;
  }

 public generatePdf(
    base64Logo:string,
    base64Photo: string,
    recipeDetails:RecipeDetails
  ): void {
    const ingredientesContent = recipeDetails.ingredientes.map(
      (ingrediente) =>
        `${ingrediente.nombre}: ${ingrediente.cantidad} ${ingrediente.unidad}`
    );

    const preparacionContent = recipeDetails.preparacion.map(
      (paso, index) => `Paso ${index + 1}: ${paso}`
    );

    const boldStyle = { bold: true };

    const documentDefinition = {
      content: [
        { image: base64Logo, margin: [0, 0, 0, 0], alignment: 'center' },
        { image: base64Photo, width: 500, height: 250, margin: [0, 20, 20, 0] },
        { text: `${recipeDetails.recipeName}`, style: boldStyle, margin: [0, 10, 0, 0], fontSize:25,fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont', width: 500 },
        {
          columns: [
            { text: 'Tipo de cocina :', style: boldStyle, margin: [0, 10, 0, 0], width: 140 },
            { text: `${recipeDetails.tipoCocina}`, margin: [0, 10, 0, 0], width: 120 },
            { text: 'Comensales:', style: boldStyle, margin: [0, 10, 0, 0], width: 80 },
            { text: `${recipeDetails.comensales}`, margin: [0, 10, 0, 0], width: 60 },
          ]
        },
          {
            columns: [
              { text: 'Tiempo de preparación :', style: boldStyle, margin: [0, 2, 0, 0], width: 140 },
              { text: `${recipeDetails.tiempoPreparacion}`, margin: [0, 2, 0, 0], width: 120 },
              { text: 'Dificultad :', style: boldStyle, margin: [0, 2, 0, 0], width: 80 },
              { text: `${recipeDetails.dificultad}`, margin: [0, 2, 0, 0], width: 60 },
            ]
          },
          {
            columns: [
              { text: 'Fecha de creación :', style: boldStyle, margin: [0, 2, 0, 0], width: 140 },
              { text: `${recipeDetails.fechaCreacion}`, margin: [0, 2, 0, 0], width: 120 },
              { text: 'Creado por :', style: boldStyle, margin: [0, 2, 0, 0], width: 80 },
              { text: `${recipeDetails.creadoPor}`, margin: [0, 2, 0, 0], width: 150 },
            ]
          },
          {
            columns: [
              { text: 'Puntuación :', style: boldStyle, margin: [0, 2, 0, 0], width: 140 },
              { text: `${recipeDetails.puntuacion}`, margin: [0, 2, 0, 0], width: 120 },
              { text: 'Votaciones :', style: boldStyle, margin: [0, 2, 0, 0], width: 80 },
              { text: `${recipeDetails.votaciones}`, margin: [0, 2, 0, 0], width: 150 },
            ]
          },
          { text: 'Ingredientes ', style: boldStyle, margin: [0, 10, 0, 0], fontSize:20,fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont', width: 500 },
      
        {text:'',margin: [0, 5, 0, 0]},
        '',
        ...ingredientesContent,
        { text: 'Preparación ', style: boldStyle, margin: [0, 10, 0, 0], fontSize:20,fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont', width: 500 },
        '',
        {text:'',margin: [0, 5, 0, 0]},
        ...preparacionContent,
        {text:'',margin: [0, 10, 0, 0]},
        { text: `Calorías totales de la receta para ${recipeDetails.comensales} comensales:`, style: boldStyle },
        `${recipeDetails.caloriasTotales} cal.`,
      ],
      styles: {
        header: {
          fontSize: 18,
          bold: true,
        },
        footer: {
          fontSize: 10,
          alignment: 'center',
        },
      },
      footer: function (currentPage, pageCount) {
        return { text: `Página ${currentPage} de ${pageCount}`, style: 'footer' };
      },
    };
    pdfMake.createPdf(documentDefinition).download(`${recipeDetails.recipeName}-recipEasy.pdf`);
  }
}