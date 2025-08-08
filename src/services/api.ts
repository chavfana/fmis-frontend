
const API_BASE_URL = 'https://chavfana.com/api';

// API service for handling backend requests
class ApiService {
  private async request(endpoint: string, options: RequestInit = {}) {
    const url = `${API_BASE_URL}${endpoint}`;
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  // Projects endpoints
  async getProjects() {
    return this.request('/projects/');
  }

  async getProject(projectId: string) {
    return this.request(`/projects/${projectId}`);
  }

  async createProject(projectData: any) {
    return this.request('/projects/', {
      method: 'POST',
      body: JSON.stringify(projectData),
    });
  }

  async searchProjects(query: string) {
    return this.request(`/projects/search/?q=${encodeURIComponent(query)}`);
  }

  // Planting events endpoints
  async getPlantingEvents(projectId: string) {
    return this.request(`/projects/${projectId}/planting-event`);
  }

  async createPlantingEvent(projectId: string, eventData: any) {
    return this.request(`/projects/${projectId}/planting-event`, {
      method: 'POST',
      body: JSON.stringify(eventData),
    });
  }

  async updatePlantingEvent(projectId: string, eventId: string, eventData: any) {
    return this.request(`/projects/${projectId}/planting-event/${eventId}`, {
      method: 'PUT',
      body: JSON.stringify(eventData),
    });
  }

  // Animal groups endpoints
  async getAnimalGroups(projectId: string) {
    return this.request(`/project/${projectId}/animal-group/`);
  }

  async createAnimalGroup(projectId: string, groupData: any) {
    return this.request(`/project/${projectId}/animal-group/`, {
      method: 'POST',
      body: JSON.stringify(groupData),
    });
  }

  // User endpoints
  async login(credentials: any) {
    return this.request('/user/login/', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
  }

  async register(userData: any) {
    return this.request('/user/register/', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  }

  // Email verification endpoints
  async confirmEmail(key: string) {
    return this.request(`/account-confirm-email/${key}/`, {
      method: 'POST',
    });
  }

  async resendEmailVerification(email: string) {
    return this.request('/resend-email/', {
      method: 'POST',
      body: JSON.stringify({ email }),
    });
  }

  // Phone verification endpoints
  async sendSMS(data: { phone_number: string }) {
    return this.request('/user/send-sms/', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async verifyPhone(data: { phone_number: string; verification_code: string }) {
    return this.request('/user/verify-phone/', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  // Fertility spreads endpoints
  async getFertilitySpreads(plantingEventId: string) {
    return this.request(`/project/planting-event/${plantingEventId}/fertility-spreads`);
  }

  async createFertilitySpread(plantingEventId: string, data: any) {
    return this.request(`/project/planting-event/${plantingEventId}/fertility-spreads`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }
}

export const apiService = new ApiService();
