#!/usr/bin/env python3
"""
Backend API Testing for HKJ SYSTEM Portfolio
Tests the three main endpoints as specified in the review request:
1. GET /api/ - Health check
2. POST /api/contact - Contact form submission  
3. GET /api/contact - Retrieve contact messages
"""

import requests
import json
import sys
from datetime import datetime
import uuid

# Get backend URL from frontend environment
def get_backend_url():
    try:
        with open('/app/frontend/.env', 'r') as f:
            for line in f:
                if line.startswith('REACT_APP_BACKEND_URL='):
                    return line.split('=', 1)[1].strip()
    except Exception as e:
        print(f"Error reading backend URL: {e}")
        return None

BASE_URL = get_backend_url()
if not BASE_URL:
    print("❌ Could not determine backend URL from frontend/.env")
    sys.exit(1)

print(f"🔗 Testing backend at: {BASE_URL}")

def test_health_check():
    """Test GET /api/ - Health check endpoint"""
    print("\n🔍 Testing Health Check Endpoint...")
    
    try:
        response = requests.get(f"{BASE_URL}/api/", timeout=10)
        
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.text}")
        
        if response.status_code == 200:
            data = response.json()
            if data.get("message") == "Hello World":
                print("✅ Health check endpoint working correctly")
                return True
            else:
                print(f"❌ Unexpected response message: {data}")
                return False
        else:
            print(f"❌ Health check failed with status {response.status_code}")
            return False
            
    except requests.exceptions.RequestException as e:
        print(f"❌ Health check request failed: {e}")
        return False

def test_contact_form_submission():
    """Test POST /api/contact - Contact form submission"""
    print("\n🔍 Testing Contact Form Submission...")
    
    # Test data with realistic information
    test_contact = {
        "name": "John Smith",
        "email": "john.smith@example.com", 
        "message": "Hello, I'm interested in your portfolio work. Could we discuss a potential project collaboration?"
    }
    
    try:
        response = requests.post(
            f"{BASE_URL}/api/contact",
            json=test_contact,
            headers={"Content-Type": "application/json"},
            timeout=10
        )
        
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.text}")
        
        if response.status_code == 200:
            data = response.json()
            
            # Verify response structure
            required_fields = ["id", "name", "email", "message", "timestamp"]
            missing_fields = [field for field in required_fields if field not in data]
            
            if missing_fields:
                print(f"❌ Missing fields in response: {missing_fields}")
                return False, None
                
            # Verify data matches input
            if (data["name"] == test_contact["name"] and 
                data["email"] == test_contact["email"] and
                data["message"] == test_contact["message"]):
                
                # Verify ID is UUID format
                try:
                    uuid.UUID(data["id"])
                    print("✅ Contact form submission working correctly")
                    print(f"   Created contact with ID: {data['id']}")
                    print(f"   Timestamp: {data['timestamp']}")
                    return True, data["id"]
                except ValueError:
                    print(f"❌ Invalid UUID format for ID: {data['id']}")
                    return False, None
            else:
                print("❌ Response data doesn't match input data")
                return False, None
        else:
            print(f"❌ Contact submission failed with status {response.status_code}")
            return False, None
            
    except requests.exceptions.RequestException as e:
        print(f"❌ Contact submission request failed: {e}")
        return False, None

def test_get_contact_messages():
    """Test GET /api/contact - Retrieve all contact messages"""
    print("\n🔍 Testing Get Contact Messages...")
    
    try:
        response = requests.get(f"{BASE_URL}/api/contact", timeout=10)
        
        print(f"Status Code: {response.status_code}")
        
        if response.status_code == 200:
            data = response.json()
            print(f"Retrieved {len(data)} contact messages")
            
            if isinstance(data, list):
                if len(data) > 0:
                    # Verify structure of first message
                    first_msg = data[0]
                    required_fields = ["id", "name", "email", "message", "timestamp"]
                    missing_fields = [field for field in required_fields if field not in first_msg]
                    
                    if missing_fields:
                        print(f"❌ Missing fields in message structure: {missing_fields}")
                        return False
                    
                    print("✅ Contact messages retrieval working correctly")
                    print(f"   Sample message from: {first_msg['name']} ({first_msg['email']})")
                    return True
                else:
                    print("✅ Contact messages endpoint working (empty list)")
                    return True
            else:
                print(f"❌ Expected list response, got: {type(data)}")
                return False
        else:
            print(f"❌ Get contact messages failed with status {response.status_code}")
            return False
            
    except requests.exceptions.RequestException as e:
        print(f"❌ Get contact messages request failed: {e}")
        return False

def test_data_persistence():
    """Test that contact data persists by submitting and then retrieving"""
    print("\n🔍 Testing Data Persistence...")
    
    # Submit a unique contact message
    unique_id = str(uuid.uuid4())[:8]
    test_contact = {
        "name": f"Test User {unique_id}",
        "email": f"test.{unique_id}@example.com",
        "message": f"This is a test message for persistence verification - {unique_id}"
    }
    
    # Submit the message
    try:
        submit_response = requests.post(
            f"{BASE_URL}/api/contact",
            json=test_contact,
            headers={"Content-Type": "application/json"},
            timeout=10
        )
        
        if submit_response.status_code != 200:
            print(f"❌ Failed to submit test message: {submit_response.status_code}")
            return False
            
        submitted_data = submit_response.json()
        submitted_id = submitted_data["id"]
        
        # Retrieve all messages and check if our message exists
        get_response = requests.get(f"{BASE_URL}/api/contact", timeout=10)
        
        if get_response.status_code != 200:
            print(f"❌ Failed to retrieve messages: {get_response.status_code}")
            return False
            
        all_messages = get_response.json()
        
        # Look for our submitted message
        found_message = None
        for msg in all_messages:
            if msg["id"] == submitted_id:
                found_message = msg
                break
                
        if found_message:
            print("✅ Data persistence working correctly")
            print(f"   Message persisted with ID: {submitted_id}")
            return True
        else:
            print(f"❌ Submitted message not found in retrieved messages")
            return False
            
    except requests.exceptions.RequestException as e:
        print(f"❌ Data persistence test failed: {e}")
        return False

def main():
    """Run all backend API tests"""
    print("🚀 Starting HKJ SYSTEM Portfolio Backend API Tests")
    print("=" * 60)
    
    results = {}
    
    # Test 1: Health Check
    results["health_check"] = test_health_check()
    
    # Test 2: Contact Form Submission
    results["contact_submission"], contact_id = test_contact_form_submission()
    
    # Test 3: Get Contact Messages
    results["get_contacts"] = test_get_contact_messages()
    
    # Test 4: Data Persistence
    results["data_persistence"] = test_data_persistence()
    
    # Summary
    print("\n" + "=" * 60)
    print("📊 TEST RESULTS SUMMARY")
    print("=" * 60)
    
    passed = sum(1 for result in results.values() if result)
    total = len(results)
    
    for test_name, result in results.items():
        status = "✅ PASS" if result else "❌ FAIL"
        print(f"{test_name.replace('_', ' ').title()}: {status}")
    
    print(f"\nOverall: {passed}/{total} tests passed")
    
    if passed == total:
        print("🎉 All backend API tests passed successfully!")
        return True
    else:
        print("⚠️  Some tests failed - check logs above for details")
        return False

if __name__ == "__main__":
    success = main()
    sys.exit(0 if success else 1)