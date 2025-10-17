import {
  Injectable,
  BadGatewayException,
  InternalServerErrorException,
} from '@nestjs/common';

@Injectable()
export class ChatService {
  private readonly n8nWebhookUrl = 'http://localhost:5678/webhook/chat-ia';

  async sendToN8nWebhook(body: any, userId: string) {
    if (!this.n8nWebhookUrl) {
      throw new InternalServerErrorException(
        'Webhook URL de n8n no configurada.',
      );
    }
    const payload = {
      ...body,
      userId,
      timestamp: new Date().toISOString(),
    };
    try {
      const response = await fetch(this.n8nWebhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Error desde n8n:', errorText);
        throw new BadGatewayException(
          `Error desde n8n: ${response.statusText}`,
        );
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error al enviar a n8n:', error.message);
      throw new BadGatewayException('No se pudo contactar el webhook de n8n.');
    }
  }
}
