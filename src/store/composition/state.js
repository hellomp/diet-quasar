export default {
  tucunduva: [],
  dris: {},
  columns: [
    {
      name: 'description',
      label: 'Descrição',
      required: true,
      align: 'left',
      field: row => row.description,
      format: val => `${val}`,
      sortable: true
    },
    { name: 'qty', label: 'Quant', required: true, field: row => row.qty },
    { name: 'energy', label: 'Energia', field: row => row.energy },
    { name: 'carbohydrate', label: 'Carb', field: row => row.carbohydrate, sortable: true },
    { name: 'protein', label: 'Prot', field: row => row.protein, sortable: true },
    { name: 'lipid', label: 'Lip', field: row => row.lipid },
    { name: 'fiber', label: 'Fibra', unit: 'g', field: row => row.fiber },
    { name: 'sodium', label: 'Sódio', unit: 'mg', field: row => row.sodium },
    { name: 'fatty_acids_poly', label: 'Á.G. Poli', field: row => row.fatty_acids_poly },
    { name: 'fatty_acids_mono', label: 'Á.G. Mono', field: row => row.fatty_acids_mono },
    { name: 'fatty_acids_sat', label: 'Á.G. Satu', field: row => row.fatty_acids_sat },
    { name: 'cholesterol', label: 'Colesterol', field: row => row.cholesterol },
    { name: 're', label: 'Retinol', field: row => row.re },
    { name: 'vitamin_C', label: 'Á. Ascorbico (C)', field: row => row.vitamin_C },
    { name: 'thiamine', label: 'Tiamina (B1)', field: row => row.thiamine },
    { name: 'riboflavin', label: 'Riboflavina (B2)', field: row => row.riboflavin },
    { name: 'pyridoxine', label: 'Piriroxina (B6)', field: row => row.pyridoxine },
    { name: 'niacin', label: 'Niacina (B3)', field: row => row.niacin },
    { name: 'calcium', label: 'Cálcio', field: row => row.calcium },
    { name: 'manganese', label: 'Manganês', field: row => row.manganese },
    { name: 'zinc', label: 'Zinco', field: row => row.zinc },
    { name: 'magnesium', label: 'Magnésio', field: row => row.magnesium },
    { name: 'potassium', label: 'Potássio', field: row => row.potassium },
    { name: 'phosphorus', label: 'Fósforo', field: row => row.phosphorus },
    { name: 'copper', label: 'Cobre', field: row => row.copper }
  ]
}
