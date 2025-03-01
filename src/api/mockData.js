// src/api/mockData.js
export const mockRepairGuides = [
    {
      id: '1',
      title: 'How to Fix a Leaky Faucet',
      description: 'A step-by-step guide to fixing a common leaky faucet problem.',
      imageUrl: 'https://www.wmhendersoninc.com/wp-content/uploads/2021/02/Reasons-Faucet-Dripping-Water-Henderson-Photo.jpg',
      difficulty: 'Easy',
      estimatedTime: '30 mins',
      tools: ['Adjustable wrench', 'Screwdriver', 'Plumber\'s tape', 'Replacement washers'],
      steps: [
        {
          title: 'Turn off the water supply',
          description: 'Locate the water shutoff valve under the sink and turn it clockwise to shut off the water supply.',
          imageUrl: 'https://www.wmhendersoninc.com/wp-content/uploads/2021/02/Reasons-Faucet-Dripping-Water-Henderson-Photo.jpg',
          tip: 'If you can\'t find a shutoff valve for the sink, you may need to turn off the main water supply to your home.'
        },
        {
          title: 'Remove the faucet handle',
          description: 'Use a screwdriver to remove the decorative cap on the handle, then unscrew the handle screw and lift off the handle.',
          imageUrl: 'https://www.wmhendersoninc.com/wp-content/uploads/2021/02/Reasons-Faucet-Dripping-Water-Henderson-Photo.jpg'
        },
        // More steps...
      ]
    },
    // More guides...
  ];
  
  // Mock AI responses
  export const mockAIResponses = {
    'how do i fix a leaky faucet': {
      message: 'To fix a leaky faucet, you\'ll need to follow these general steps:\n\n1. Turn off the water supply\n2. Remove the faucet handle\n3. Remove the cartridge or stem\n4. Replace the washer or O-ring\n5. Reassemble the faucet\n\nI\'ve found a detailed guide that might help you. Would you like to see it?',
      repairGuides: [mockRepairGuides[0]],
      tools: ['Adjustable wrench', 'Screwdriver', 'Plumber\'s tape', 'Replacement washers'],
      difficulty: 'Easy'
    },
    // More mock responses...
  };
  