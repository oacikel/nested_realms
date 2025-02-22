import { Entity, EntitySuggestionRequest } from '@/types/types'

export const HuggingFaceService = {
  async suggestChildrenEntities(
    entitySuggestionRequest: EntitySuggestionRequest,
  ) {
    const {
      parentName,
      description,
      existingChildren,
      additionalInfo,
      numChildren,
    } = entitySuggestionRequest

    const prompt = `
You are a world-building AI with the ability to generate meaningful child entities based on the context of a given parent entity. Your task is to create new child entities based on the provided parent, description, existing children, and any additional information provided. Each child entity should feel naturally related to the parent and fit the world-building context.

Parent Entity: ${parentName}
Description: ${description}
Existing Children: ${existingChildren?.join(', ') || 'None'}
Additional Information: ${additionalInfo || 'None'}
Number of Children to Create: ${numChildren}

Instructions:
- Generate child entities that expand the parent entity's world. 
    - Each child entity should have a ${name} and a ${description}.
    - The ${name} should be brief but evocative of the entity's role or characteristics in the world.
- The ${description} should provide enough detail to paint a vivid picture of the child entity's role, appearance, or significance.

Example Output (JSON format):
[
  { 
    "name": "Child Entity 1", 
    "description": "A brief but detailed description of the first child entity, describing its unique characteristics or role in the world."
  },
  { 
    "name": "Child Entity 2", 
    "description": "A brief but detailed description of the second child entity, highlighting its relationship to the parent and the world."
  }
]
`

    try {
      const response = await fetch(
        'https://openrouter.ai/api/v1/chat/completions',
        {
          method: 'POST',
          headers: {
            Authorization:
              'Bearer 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',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            model: 'deepseek/deepseek-chat:free',
            messages: [
              {
                role: 'user',
                content: prompt,
              },
            ],
          }),
        },
      )

      const text = await response.text()
      const extractedJSON = this.formatEntityResponse(text)
      console.log('Generated: ', extractedJSON)

      return this.formatEntityResponse(text)
    } catch (error) {
      console.error('AI Generation Error:', error)
      return []
    }
  },

  formatEntityResponse(response: any): Entity[] {
    try {
      // Parse the JSON string from the 'content' field in the response
      const fullObject = JSON.parse(response)
      const answer = fullObject.choices[0].message.content
      console.log('parsed object is', fullObject)
      console.log('Answer is ', answer)

      const parsedAnswer = JSON.parse(answer)
      console.log('Parsed answer is ', parsedAnswer)
      // Map the parsed JSON into the desired format
      const formattedEntities = parsedAnswer.map((entity: any) => ({
        entityName: entity.name,
        description: entity.description,
      }))

      return formattedEntities
    } catch (error) {
      console.error('Error formatting response:', error)
      return []
    }
  },

  extractJSON(text: string): unknown {
    try {
      // Extract JSON array from the response, ensuring a correct match
      const match = text.match(/\[.*\]/s)
      if (match) {
        return JSON.parse(match[0]) // Parse JSON if a valid array is found
      } else {
        console.warn('No JSON array found in response')
        return [] // Return empty array if no valid JSON is found
      }
    } catch (error) {
      console.error('Error parsing JSON:', error)
      return [] // Return empty array in case of parsing error
    }
  },
}
